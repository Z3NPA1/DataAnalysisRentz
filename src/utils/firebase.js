// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {  getDoc, setDoc, doc, getFirestore, collection, updateDoc, query, getDocs, deleteDoc, DocumentReference, arrayUnion}   from 'firebase/firestore';
import {getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

import { getAnalytics, logEvent } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDEbn57UVIaoPmT8C8NrV_3WMmIKs9R4YE",
  authDomain: "rentz-555.firebaseapp.com",
  projectId: "rentz-555",
  storageBucket: "rentz-555.appspot.com",
  messagingSenderId: "36444490901",
  appId: "1:36444490901:web:9b54077949595de2b01f9c",
  measurementId: "G-8MK34XN24L"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 const db = getFirestore();

 export const eventData = (type,name) =>{

    if(type === 'filter:Rooms'){

        logEvent(analytics, 'Room_filter', {
            content_type: name,
            content_id: type
          });
    }
    if(type === 'filter:PG'){

        logEvent(analytics, 'PG_filter', {
            content_type: name,
            content_id: type
          });
    }
    if(type === 'filter:Appartments'){

        logEvent(analytics, 'Appartment_filter', {
            content_type: name,
            content_id: type
          });
    }
    if(type === 'filter:price' && name === '4000-5000'){

        logEvent(analytics, 'Price_filter_4000-5000', {
            content_type: name,
            content_id: type
          });
    }
    if(type === 'filter:price' && name === '5000-6000'){

        logEvent(analytics, 'Price_filter_5000-6000', {
            content_type: name,
            content_id: type
          });
    }
    if(type === 'filter:price' && name === '7000-8000'){

        logEvent(analytics, 'Price_filter_7000-8000', {
            content_type: name,
            content_id: type
          });
    }
    if(type === 'filter:bhk' && name === 'BHK1'){

        logEvent(analytics, 'BHK_filter_1BHK', {
            content_type: name,
            content_id: type
          });
    }
    if(type === 'filter:bhk' && name === 'BHK2'){

        logEvent(analytics, 'BHK_filter_2BHK', {
            content_type: name,
            content_id: type
          });
    }
    if(type === 'filter:bhk' && name === 'BHK3'){

        logEvent(analytics, 'BHK_filter_3BHK', {
            content_type: name,
            content_id: type
          });
    }
    if(type === 'selected_room'){
        logEvent(analytics, 'select_room', {
            content_type: name,
            content_id: type
          });
    }
} 

 //initializing admin
 
 export const sumbitApartmetRequest = async(data) => {
    try{
        const docRef = doc(db, 'apartmentRequests', `${data.emailId}`)
        await setDoc(docRef, data);
        console.log('data setting successful');
    }catch(error) {
        console.log(error);
    }
 }

 export const addRequestDocumentToStorage = async(data) => {
    console.log(data.adharDoc)
    try{

        const folderRef = ref(storage, 'requestsDocuments/');
        const subFolderRef = ref(folderRef, `${data.emailId}:adharCard/`);
        const subFolderRefII = ref(folderRef,`${data.emailId}:houseDoc/`);
        for(let i of data.adharDoc) {
            const imgRef = ref(subFolderRef, i.name);
            await uploadBytes(imgRef, i)
            const url = await getDownloadURL(imgRef);
            data.adharDoc[data.adharDoc.indexOf(i)] = url
            console.log(data);
        }
        for(let i of data.houseDoc) {
            const imgRef = ref(subFolderRefII, i.name);
            await uploadBytes(imgRef, i)
            const url = await getDownloadURL(imgRef);
            data.houseDoc[data.houseDoc.indexOf(i)] = url
            console.log(data);   
        }
        return data

    }catch(error) {
        console.log(error);
    }
 }

 
//fetching data from firestore

 export const fetchApartmentRequests = async() => {
    try{
        const docRef = collection(db, 'apartmentRequests');
        const q = query(docRef);
        const apartmentSnapShot = await getDocs(q);
        // console.log(apartmentSnapShot);
        // const requestMap = apartmentSnapShot.docs.reduce((acc, item) => {
        //     const {fullName, emailId, location, phoneNumber, adharDoc, houseDoc} = item.data()
        //     acc[ emailId ] = {fullName, emailId, location, phoneNumber, adharDoc, houseDoc}
        //     return acc;
        //      },{})
        //      return requestMap

        const data = apartmentSnapShot.docs.map(doc => {return doc.data()})
        return data
    
    } catch(error) {
        console.log(error);
    }
 }

 //function to fetch the room data
 export const fetchRooomData = async() => {
    try{
        const docRef = collection(db, 'roomData');
        const q = query(docRef);
        const roomSnapShot = await getDocs(q);

        const data = roomSnapShot.docs.map(doc => {return doc.data()})
        return data;
    } catch(error) {
        console.log(error);
    }
 }



 
 export const acceptApartmentRequests = async(data, houseId) => {
    try{
        const docRef = doc(db, 'OwnerUsers', `${data.emailId}`);
        const docReqRef = doc(db, 'apartmentRequests', `${data.emailId}`)
        await  setDoc(docRef, data);
        console.log('data successfully set');
        await deleteDoc(docReqRef);
        await updateDoc(docRef,{houseId: houseId});
        console.log('request accepted');
    } catch(error) {
        console.log(error);
    }
 }

 export const rejectApartmentRequests = async(data) => {
    try{
        const docRef = doc(db, 'apartmentRequests', `${data.emailId}`)
        await deleteDoc(docRef);
        console.log('request Rejected');
    } catch(error) {
        console.log(error);
    }
    
 } 

 
 

//creating Apartment and creating room document;
export const createApartmentDocument = async (data) => {
    const CollectionRef =  collection(db, 'Apartments');
    const DocumentRef =  doc(CollectionRef, `${data.houseId}`)
    
    const DocumentSnapShot = await getDoc(DocumentRef);

    if(!DocumentSnapShot.exists()) {
        const createdAt = new Date();
        try {
            await setDoc(DocumentRef, {
                createdAt,
                ...data
            } )
        } catch (error) {
            console.log('error setting document', error);
        }
    } else {
        const existingData = DocumentSnapShot.data();
        const updatedRooms = [...existingData.rooms, ...data.rooms];
    
        try {
          await updateDoc(DocumentRef, {
            rooms: updatedRooms
          });
          console.log('Array updated');
        } catch (error) {
          console.log('Error updating document', error);
        }
      }
    
      return DocumentSnapShot;
    };


//uploading room images
export const addRequestRoomInfo = async (data) => {
    console.log(data);
    try {
      const folderRef = ref(storage, 'roomImages/');
      const updatedRooms = [];
  
      for (let room of data.rooms) {
        const subFolderRef = ref(folderRef, `${room.roomId}/`);
        const roomImages = [];
  
        for (let image of room.roomImageBox) {
          const imgRef = ref(subFolderRef, image.name);
          await uploadBytes(imgRef, image);
          const url = await getDownloadURL(imgRef);
          roomImages.push(url);
        }
  
        const updatedRoom = {
          ...room,
          roomImageBox: roomImages,
        };
        updatedRooms.push(updatedRoom);
      }
  
      const updatedData = {
        ...data,
        rooms: updatedRooms,
      };
  
      console.log(updatedData);
      return updatedData;
    } catch (error) {
      console.log(error);
    }
  };
//authentication...
 export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email, uid } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          uid,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userDocRef;
  };
  
  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
  
    return await signInWithEmailAndPassword(auth, email, password);
  };
  
  export const signOutUser = async () => {
    console.log('reached here')
    await signOut(auth); 
}
  
  export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);
  
//create documents to be displayed in the front end of our project

    export const createRoomData = async(data) => {
        try{
           
        const obj = arrayToObject(data);
        const docRef = doc(db, 'roomData', `${obj.roomId}`) 
            await setDoc(docRef, obj);
            console.log(docRef);
        }catch(error) {
            console.log(error);
        }
    }
 
  export function arrayToObject(array) {
        return array.reduce((obj, item) => {
            const { roomId, roomDescription, isEmpty, roomImageBox, price } = item;
          obj[roomId ] = {roomId, roomDescription, isEmpty, roomImageBox, price}
          return obj;
        }, {});
      }


//old code
 export const updateImageBox = async (updatedData, roomName) => {
     const DocumentRef = doc(db, 'roomData', `${roomName}`);
     

    try {
        
        await updateDoc(DocumentRef,{ 'imageBox' : updatedData });
        console.log('imageBox updated')
    } catch (error) {
        console.log('error updating document', error);
    }
 }

 export const updateIsEmpty = async (updatedData, roomName) => {
    console.log(updatedData);
    console.log(roomName);
   
    

   try {
    const RoomDocumentRef = doc(db, 'roomData', roomName.id);
       await updateDoc(RoomDocumentRef,{ 'isEmpty' : updatedData });
       console.log('this document will now be displyed or de-displayed according to what you choose');
   } catch (error) {
       console.log('error updating document', error);
   }
}

//creating documents of all the requests of owners to do business with us;
export const createRequestDocument = async(data) => {
    try{
        const collectionRef = collection(db, 'Requests');
        const documentRef = doc(collectionRef, `${data.emailId}`);

       await setDoc(documentRef, data);
       console.log('document Creation Success');
            
    } catch(error){
        console.log(error);
    };
}

export const uploadLegalDocument = async(img, email) => {
    try{
        const adharRef = ref(storage, `request:${email}/`);
        const folderRef = ref(adharRef,'adharCard' );
        for(const imageFile of img){
           const creationRef = ref(folderRef, imageFile.name);
           await uploadBytes(creationRef, imageFile);
           console.log('image updated');
        }
    } catch(error){
        console.log(error);
    }
}

export const uploadLegalDocumentII = async(img, email) => {
    try{
        const adharRef = ref(storage, `request:${email}/`);
        const folderRef = ref(adharRef,'HouseDocument' );
        for(const imageFile of img){
           const creationRef = ref(folderRef, imageFile.name);
           await uploadBytes(creationRef, imageFile);
           console.log('image updated');
        }
    } catch(error){
        console.log(error);
    }
}

//fetching adhar card image from firebase storage to firestore



export const fetchAdharUrl = async (email) => {
  try {
    const docRef = ref(storage, `request:${email}/`);
    const imageRef = ref(docRef, 'adharCard');
    const imageList = await listAll(imageRef);
    const urls = await Promise.all(
      imageList.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return url;
      })
    );
    console.log(urls);
    await updateAdharUrl(urls, email); // Update the Firestore document with the URLs
    return urls;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateAdharUrl = async (adharUrls, email) => {
  try {
    const docRef = doc(db, 'Requests', `${email}`)
    await updateDoc(docRef, {adharCard: adharUrls})
    console.log('adharCard Update Successful');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//fetching houseDocument from firebase storage to firestore
export const fetchHouseDocUrl = async(email) => {
    try{
        const docRef = ref(storage, `request:${email}/`);
        const imageRef = ref(docRef, 'HouseDocument/' );
        const imageList = await listAll(imageRef);
        const urls = await Promise.all(imageList.items.map(async(item) => {
            const url = await getDownloadURL(item);
            return url;
        }))
      
        await updateHouseDocUrl(urls, email)
        return urls;

    } catch(error) {
        console.log(error);
    }
 }

 export const updateHouseDocUrl = async(houseDocUrl, email) => {
    try{
        const docRef = doc(db, 'Requests', `${email}`);
        await updateDoc(docRef, {houseDoc: houseDocUrl});
        console.log('HouseDoc Update Successful');
    } catch(error) {
        console.log(error);
    }
 }

// storage functions
export const storage = getStorage(app);


export const uploadImages = async(imageFiles, houseId) => {
    console.log(houseId);
    const storageRef = ref(storage, `${houseId}/`);
    try{
        for(const imageFile of imageFiles) {
            const fileRef = ref(storageRef, imageFile.name);
            await uploadBytes(fileRef, imageFile);
            console.log('image upload success');

        };
    } catch(error) {
        console.log('error uploading the document');
    };
    return storageRef;
}

//fetching urls
export const fetchUrls = async (houseId) => {
    try {
        const folderRef = ref(storage, `${houseId}/`);
        const list = await listAll(folderRef);
        const urls = await Promise.all(list.items.map(async (item) => {
            const url = await getDownloadURL(item);
            console.log(url);
            return url;
        }));
        console.log(urls);
        await updateImageBox(urls, houseId);
        } catch(error) {
        console.log('error', error);
        return null
    }
}

//Fetching a particular room's data.
export const getRoomInfo = async (houseId) => {
    
    
    try{
        const roomCollectionRef = collection(db, 'roomData');
        const roomDocRef = doc(roomCollectionRef, `${houseId}`);
        
       const documentsSnapshot = await getDoc(roomDocRef);
       if(documentsSnapshot.exists()) {
        const documents = documentsSnapshot.data();
       
        console.log('firebase',documents);
        return documents;
       }
       
    } catch(error) {
        console.log(error);
        
    };
  
}

//fetching the room data to the front end..

export const roomsMapArray = async () => {
    const collectionRef = collection(db, 'roomData');
    const q = query(collectionRef);
    const roomsSnapShot = await getDocs(q);

    const roomMap = roomsSnapShot.docs.reduce((acc, snap) => {
        const { houseId, features, type, roomDescription, liked, price, washroom, roomReviews, imageBox, isEmpty} = snap.data();
        if(isEmpty) {

             acc[ houseId ] = { houseId, features, type, roomDescription, liked, price, washroom, roomReviews, imageBox, isEmpty};
        } 

        return acc;

    },{})
    return roomMap;
           
            }
//Display Array of Requests
export const viewRequests = async () => {
    const collectionRef = collection(db, 'apartmentRequests');
    const q = query(collectionRef);
    const roomsSnapShot = await getDocs(q);

    const roomMap = roomsSnapShot.docs.reduce((acc, snap) => {
        const { emailId } = snap.data();
         acc[ emailId ] = { emailId};
    return acc;

    },{})
    return roomMap;
           
            }

//fetching indivudual request from db based on email id 
export const individualRequests = async (email) => {
    console.log(email);
    try{
        const collectionRef = collection(db, 'Requests');
        const docRef = doc(collectionRef, `${email.email}`);
        const docSnapShot = await getDoc(docRef);
        if(docSnapShot.exists()) {
            const data = docSnapShot.data();
            console.log(data);
            return data;

        }
        
    } catch(error) {
        console.log(error);
    }
}
//function to set data inside approved owner Admin

export const createApprovedAdmins = async (admin) => {
    try{
        const docRef = doc(db, 'approvedAdmins', `${admin.emailId}`);
        await setDoc(docRef, admin);
        console.log('setting of document is complete');
    } catch(error) {
        console.log(error);
    }
}
export const deleteRequests = async (email) => {
    try{
       const docRef = doc(db, 'Requests', `${email}`);
        await deleteDoc(docRef);
        console.log('request successfully removed')
        
    } catch(error) {
        console.log(error);
    }
}


//merging houseId
export const mergeHouseId = async (email, id) => {
    const collectionRef = doc(db, 'ownerAdmin', `${email}`);
    console.log('running 1');
    try {
      await updateDoc(collectionRef, { houseId: id });
      console.log('Merge operation completed successfully.');
    } catch (error) {
      console.error('Error merging field:', error);
    }
  };

  //fetch owner individual document;
  export const fetchOwnerInfo = async (email) => {
    console.log(email);
    try{
        const collectionRef = collection(db, 'approvedAdmins');
        const docRef = doc(collectionRef, `${email}`);
        const docSnapShot = await getDoc(docRef);
        if(docSnapShot.exists()) {
            const data = docSnapShot.data();
            console.log(data);
            return data;

        }
        
    } catch(error) {
        console.log(error);
    }
};
//function to set data inside appropriate Apartments
export const setApartmentData = async (data) => {
    console.log('hi its reaching here');
    try{
        const docRef = doc(db,`${data.houseId}`, `${data.houseId}_${data.roomNumber}`);
        await setDoc(docRef, data);
        console.log('setting of document is complete');
    } catch(error) {
        console.log(error);
    };
}

//function to upload images

export const roomsImgUpload = async (data, img) => {
    try{
        const folderRef = ref(storage, `${data.houseId}_${data.roomNumber}/`);
        for(const i of img) {
            const imgRef = ref(folderRef, i.name);
            await uploadBytes(imgRef, i);
            
            console.log('upload success');
         };
    } catch(error) {
        console.log(error);
    };
} ;

export const uploadTenantAdhar = async( data, img ) => {
    try{
        const folderRefI = ref(storage, 'tenantsDoc/' );
        const folderRefII = ref(folderRefI, `${data.houseId}_${data.roomNumber}/`);
      
        for(const i of img) {
            const imageNameRef = ref(folderRefII, i.name);
            await uploadBytes(imageNameRef, i);
            console.log('success');
         }
    } catch(error) {
        console.log(error);
    }
}

//function to fetch the rooms which have not been approved
export const unApprovedRooms = async () => {
    const collectionRef = collection(db, 'RoomRequests');
    const q = query(collectionRef);
    const roomsSnapShot = await getDocs(q);

    const roomMap = roomsSnapShot.docs.reduce((acc, snap) => {
        const { houseId, roomNumber} = snap.data();
    

             acc[ houseId ] = { houseId, roomNumber};
        

        return acc;

    },{})
    return roomMap;
           
            }

//fetch adhar urls of tenants

 export const tenantUrl = async(data) => {
    console.log('here is data',data);
    
        try {
            const folderRef = ref(storage, 'tenantsDoc/')
            const folderRefII=ref(folderRef, `${data.houseId}_${data.roomNumber}/`);
            const list = await listAll(folderRefII);
            const urls = await Promise.all(list.items.map(async (item) => {
                const url = await getDownloadURL(item);
                console.log('yo');
                return url;
            }));
            console.log('yoII',urls);
            await updateTenantAdharCard(urls, data);
            
            } catch(error) {
            console.log('error', error);
            return null
        }
    }
//function to update fetched image urls to imagebox

export const updateTenantAdharCard = async (url, docData) => {
    const DocumentRef = doc(db,`${docData.houseId}`, `${docData.houseId}_${docData.roomNumber}`);
    

   try {
       
       await updateDoc(DocumentRef,{ 'tenant_adhar' : url });
       console.log('imageBox updated')
   } catch (error) {
       console.log('error updating document', error);
   }
}

//fetch adhar urls of tenants

export const roomUrl = async(data) => {
    console.log('here is data',data);
    
        try {
            
            const folderRefII=ref(storage, `${data.houseId}_${data.roomNumber}/`);
            const list = await listAll(folderRefII);
            const urls = await Promise.all(list.items.map(async (item) => {
                const url = await getDownloadURL(item);
                console.log('yo');
                return url;
            }));
            console.log('yoII',urls);
            await updateRoomUrls(urls, data);
            
            } catch(error) {
            console.log('error', error);
            return null
        }
    }
//function to update fetched image urls to imagebox

export const updateRoomUrls = async (url, docData) => {
    const DocumentRef = doc(db,`${docData.houseId}`, `${docData.houseId}_${docData.roomNumber}`);
    

   try {
       
       await updateDoc(DocumentRef,{ 'imagebox' : url });
       console.log('imageBox updated')
   } catch (error) {
       console.log('error updating document', error);
   }
}

//fetching individual document to send a request to admin
    export const fetchDoc = async (data) => {
        console.log(data);
        try{
            const docRef = doc(db, `${data.houseId}`, `${data.houseId}_${data.roomNumber}`);
            const docSnapShot = await getDoc(docRef);
                if(docSnapShot) {
               const req = docSnapShot.data();;
                await unApprovedRoomsRequest(req);
               console.log('my data', req);
                    return req
                }
            
           
            
        } catch (error) {
            console.log(error);
        }
    }


//function to upload the above document to the UnapprovedRooms

    export const unApprovedRoomsRequest = async (data) => {
        try {
            const docRef = doc(db, 'RoomRequests', `${data.houseId}_${data.roomNumber}`)
            await setDoc(docRef, data);
            console.log('request successfully sent');
        } catch(error) {
            console.log(error);
        }
    }


//function to create unApprovedRoomDisplayRequests 
   export const roomRequests = async(data) => {
    console.log('fetched document', data);
        try{
            const docRef = doc(db, 'UnapprovedRooms', `${data.houseId}_${data.roomNumber}`);
            await uploadBytes(docRef, data);
            console.log('request sent successfully');
        } catch(error) {
            console.log(error);
        }
   };

   //funciton to fetch the details of individual room request inorder to display it to the admin

export const individualRoomRequest = async (roomId) => {
    console.log(roomId);
    try{
        const collectionRef = collection(db, 'RoomRequests');
        const docRef = doc(collectionRef, `${roomId.roomId}`);
        const docSnapShot = await getDoc(docRef);
        if(docSnapShot.exists()) {
            const data = docSnapShot.data();
            console.log(data);
            return data;

        }
        
    } catch(error) {
        console.log(error);
    }
}

//set document to the folder through which data is fetched in the front end;

    export const uploadToRoomData = async(data, roomId) => {
        try {
            const docRef = doc(db, 'roomData', `${roomId.roomId}`);
            const reqDocRef = doc(db,'RoomRequests', `${roomId.roomId}`)
            await setDoc(docRef, data);
            console.log('request accept success');
            await deleteDoc(reqDocRef);
        } catch(error) {
            console.log(error);
        };
    };
//function to delete requests
    export const deleteRequestsData = async (roomId) => {
        try{
            const docRef = doc(db, 'RoomRequets', `${roomId.roomId}`);
            await deleteDoc(docRef);
            console.log('rejection Successfull');
        } catch(error) {
            console.log(error);
        }

    };

//function to fetch the roomId list of a partiuclar houseOwner;
export const roomIdFetching = async (houseId) => {
    console.log(houseId.houseId);
    try {
      const collectionRef = collection(db, `${houseId.houseId}`);
      const q = query(collectionRef);
      const roomsSnapShot = await getDocs(q);
  
        console.log('entered the if block');
        const roomMap = roomsSnapShot.docs.reduce((acc, snap) => {
          const { roomNumber } = snap.data();
          acc[roomNumber] = { roomNumber };
          console.log(acc);
          return acc;
        }, {});
        console.log(roomMap);
        return roomMap;
      
    } catch (error) {
      console.log(error);
    }
  };


//user Authentication sector
const auth = getAuth();

export const signUpUserWithEmailAndPassword = async(email, password) => {
    try{
        await createUserWithEmailAndPassword(auth, email, password);
        console.log('user SignUp success');
    } catch(error){
        console.log(error);

    }
}

export const signInUserwithEmailAndPassword = async(email, password) => {
    try{
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
        return user;
    } catch(error) {
        console.log(error);
    }
}

//Building Custom Authentication
// const auth = getAuth();

// export const createAdminSignUp = async(email, password) => {
//     try{
//         const adminCredentials = await createUserWithEmailAndPassword(auth, email, password);
//         const admin = adminCredentials.user;
//         const id = admin.uid;
//         console.log(id);
//         console.log("adminUser creation success", admin);
//         const role = 'admin';
//         await callCustomClaimsHandler(id, role);
//     } catch(error) {
//         console.log('error creating document', error);
//     }
// }

// export const callCustomClaimsHandler = async(uid, role) => {
//     try{
//         await createCustomToken(uid, {role});
//         console.log('custom user claims setting done');
//     } catch(error){
//         console.log(error);
//     }
// }
        