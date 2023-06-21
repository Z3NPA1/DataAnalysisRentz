import { useState } from "react"
import { fetchOwnerInfo, roomsImgUpload, uploadTenantAdhar, setApartmentData, unApprovedRooms, tenantUrl, roomUrl, fetchDoc, roomIdFetching } from "../utils/firebase";


const OwnerProfile = () => {

    const defaultDocumentFiedls = {
        fullName: "",
        email: "",
        roomNumber: "",
        features: {
            all_time_water: false,
            furnished: false,
            gyeser: false,
            inverter: false,
            wifi: false

        },
        houseId: '',
        imageBox: [],
        liked: "",
        price: "",
        roomDescription: "",
        roomReviews: {},
        type:"",
        washroom: "",
        isEmpty: true,

        tenantName: '',
        stayedFrom: '',
        rentPaid: false,
        tenant_adhar: [],
        isApproved:false


    }

    const defaultFields = {
        email: '',
        houseId: ''
    }
     const [fields, setFields] = useState(defaultFields);
     const [profile, setProfile] = useState([]);
     const [docData, setDocData] = useState(defaultDocumentFiedls);

     const [roomImages, setRoomImages] = useState([]);
     const [adharImg, setAdharImg] = useState([]);
     const [idList, setIdList] = useState([]);

     const changeHandler = (e) => {
        const {name, value} = e.target;
        setFields({...fields, [name]:value});
        console.log(fields);
     };

     const callFetchProfileData = async () => {
      
           const data =  await fetchOwnerInfo(fields.email);
           setProfile(data);
           console.log(data);
       }

    const onChangeRoomHandler = (e) =>{
        const {name, value} = e.target;
        setDocData({...docData, [name]: value});
        console.log(docData);

    }

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        await setApartmentData(docData);
    }

    const onChangeRoomsImageHandler = (e) => {
        const file = e.target.files;
        setRoomImages([...roomImages, ...file]);
        console.log(roomImages);
    }

    const onChangeAdharImageHandler = (e) => {
        const file = e.target.files;
        setAdharImg([...adharImg, ...file]);
        console.log(adharImg);
    }

    const putRoomsImages = async (e) => {
        e.preventDefault();
        await roomsImgUpload(docData, roomImages);
        console.log('upload Success');

    }

    const commitAdharImages = async() => {
    
        await tenantUrl(docData);
        console.log('updated');
       
        
    }
  

    const putAdharImages = async (e) => {
        e.preventDefault()
        await uploadTenantAdhar(docData, adharImg);
        console.log('step1 succeeds');
       
    }

    const commitRoomsImages = async () => {
        await roomUrl(docData, roomImages);
    };

    const SubmitRequestHandler = async () => {
        await fetchDoc(docData);
    }

    const listRoomIds = async () => {
       const data = await roomIdFetching(docData);
       const list = Object.values(data).map((item) => item.roomNumber)
       console.log(data);
       setIdList(list);
       console.log('list', list);
       console.log(idList);
    }

   
     

    return (
      <div>
            <div>
                navbar, with features signOut, changePasswrod
            </div>
            <div>
                <input onChange={changeHandler} placeholder="input your email" name="email" value={fields.email}/>
                <button onClick={callFetchProfileData}>submit</button>
                <input onChange={changeHandler} placeholder="input your houseId" name="houseId" value={fields.houseId}/>
            </div>
            <div>
            {profile && (
                    <div>
                        <h1>FullName: {profile.fullName} </h1>
                        <h1>Email Id: {profile.emailId} </h1>
                        <h1> Number Of Rooms as per your input: {profile.roomNumbers} </h1>

                    </div>
                )
            }
            
                
            </div>
            <div>
                
                    <input type="text" onChange={onChangeRoomHandler} value={docData.fullName} name="fullName" placeholder="write your registered full name" />
                    <input type="email" onChange={onChangeRoomHandler} value={docData.email} name="email" placeholder="write your full name here" />
                    <input type="text" onChange={onChangeRoomHandler} value={docData.roomNumber} name="roomNumber" placeholder="write your room number here" />
                    <label>features :</label>
            

                    <label >
                     all time water:
                     <label>
                     true --  
                         <input onChange={onChangeRoomHandler} type="boolean" name="all_time_water" value={true} placeholder="true"/>
                     </label>
                    <label>
                    false--
                        <input onChange={onChangeRoomHandler} type="boolean" name="all_time_water" value={false} placeholder="false" /> 
                     </label>
                    
                     </label>
                     <br />
        
                     
                     <label >
                      furnished:
                      <label>
                      true --
                      <input onChange={onChangeRoomHandler} type="radio" name="furnished" value={true} placeholder="true"/>
                      </label>
                      
                      <label>
                      false --
                        <input onChange={onChangeRoomHandler} type="radio" name="furnished" value={false} placeholder="false" /> 
                    </label>
                      
                      </label>
                      <br />
        
                      <label >
                      geyser:
                      <label>
                        true --
                        <input onChange={onChangeRoomHandler} type="radio" name="geyser" value={true} placeholder="true"/>
                      
                      </label>
                       false --
                      <input onChange={onChangeRoomHandler} type="radio" name="geyser" value={false} placeholder="false" /> 
                      </label>
                      <br />
        
                      <label >
                      inverter:
                      <label>
                      true --
                      <input onChange={onChangeRoomHandler} type="radio" name="inverter" value={true} placeholder="true"/>
                      </label>
                      <label>
                      false --
                      <input onChange={onChangeRoomHandler} type="radio" name="inverter" value={false} placeholder="false" /> 
                      </label>
                      </label>
                      <br />
        
                      
                      <label >
                      wifi:
                      <label>
                        true --
                      <input onChange={onChangeRoomHandler} type="radio" name="wifi" value={true} placeholder="true"/>
                      </label>
        
                      <label>
                        false --
                      <input onChange={onChangeRoomHandler} type="radio" name="wifi" value={false} placeholder="false" /> 
                      </label>
                      </label>
                      <br />
        
                      <label >
                      houseId: 
                      <input onChange={onChangeRoomHandler} type="text" name="houseId" value={docData.houseId} placeholder="houseId"/>
                     </label>
                      <br />
        
                    
        
                      
                      <label >
                      price: 
                      <input onChange={onChangeRoomHandler} type="text" name="price" value={docData.price} placeholder="price"/>
                     </label>
                      <br />
        
                      
                      <label >
                      roomDescription: 
                      <input onChange={onChangeRoomHandler} type="text" name="roomDescription" value={docData.roomDescription} placeholder="brief room description"/>
                     </label>
                      <br />
        
                    
        
                      <label >
                      type: 
                      <input onChange={onChangeRoomHandler} type="text" name="type" value={docData.type} placeholder="eg. 1BHK"/>
                     </label>
                      <br />
        
                      <label >
                      washroom: 
                      <input onChange={onChangeRoomHandler} type="text" name="washroom" value={docData.washroom} placeholder="Indian/western"/>
                     </label>
                      <br />

                      <label >
                      isEmpty:
                      <label>
                        true --
                        <input onChange={onChangeRoomHandler} type="radio" name="isEmpty" value={true} placeholder="true"/>
                      
                      </label>
                      <label>
                       false --
                      <input onChange={onChangeRoomHandler} type="radio" name="isEmpty" value={false} placeholder="false" /> 
                      </label>
                      </label>
                      <br />
        
                      <h1> Tenant's details </h1>
                      <h4>fill this after the Is Empty state is declared false</h4>

                      <div>
                      <input type="text" onChange={onChangeRoomHandler} value={docData.tenantName} name="tenantName" placeholder="write the name of your tenant" />
                      <input type="date" onChange={onChangeRoomHandler} value={docData.stayedFrom} name="stayedFrom" placeholder="the date from where tenant started staying" />
                      </div>
                    <div>
                    
                    <label>
                    true --
                    <input onChange={onChangeRoomHandler} type="radio" name="rentPaid" value={true} placeholder="true"/>
                  
                  </label>
                  <label>
                   false --
                  <input onChange={onChangeRoomHandler} type="radio" name="rentPaid" value={false} placeholder="false" /> 
                  </label>
                  <br />
                  </div>
      
                    <button type='button' onClick={onSubmitHandler}> Create Room Document </button>
            

                <div>

                </div>
            <div>
                <h2> Upload your room Images</h2>
                <input type="file" accept="image/*" multiple onChange = {onChangeRoomsImageHandler} />
                <button onClick={putRoomsImages}> upload  </button>
                <button onClick={commitRoomsImages}> commit </button> 
                <br/>
                <h2> Upload Tenant's Id document </h2>
                <input type="file" accept="image/*" multiple onChange = {onChangeAdharImageHandler} />
                <button onClick = {putAdharImages}> Upload </button>
                
                <button onClick={commitAdharImages}> commit </button>
                <div>
                    <button onClick={SubmitRequestHandler}> Submit Request </button>
                </div>
            </div>
            <div>
                <h1> View the Room Information From here</h1>
                <h2> list of rooms you have uploaded</h2>
                
                <button onClick={listRoomIds}> ViewRooms </button>
                {idList.map((id, index) => (
                    <div key={index}>

                        <h1>{id} </h1>
                    </div>
                ))}
               
            </div>

            <div>
                setRoomInfo
            </div>
            </div>
        </div>
    )

}

export default OwnerProfile;