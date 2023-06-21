import { useState
 } from "react"

 import { createRoomDocument, uploadImages, fetchUrls, getRoomInfo, updateIsEmpty, viewRequests } from "../utils/firebase";


const Admin = () => {

    const defaultFormFields = {
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
        isEmpty: true

    };
    const defualtId = {
        id: ''
    };

    const[images, setImages] = useState([]);
    const[imageUrl, setImageUrl] = useState([]);

    const [formFields, setFormFields] = useState(defaultFormFields)
    const {houseId, isEmpty } = formFields;

    const reSetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const onChangeHandler = (e) => {
        
        const {name, value} = e.target;
        setFormFields({...formFields, [name]:value} )
        
    }
//making object in the firestore and creating room document
    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try{
            await createRoomDocument(formFields )
            console.log('document Creation Complete')
        } catch(error) {
            console.log(error);
        };

    }


//uploading and handling image section
 const [storageUrls, setStorageUrls] = useState([])

    const handleImageChange = (event) => {
        const files = event.target.files;

        setImages([...images, ...files]);
        console.log(images);

    };

    const callUploadImages = async () => {
        try{
            await uploadImages(images, houseId);
           alert('image Upload Successfull');
        } catch(error) {
            console.log(error);
        }
    }

    const callFetchUrls = async () => {
        console.log(storageUrls)
        try{
          await fetchUrls(houseId)
        
        } catch(error) {
            console.log('error');
        }
    };


//giving update excess to the admin
    const [id, setId] = useState(defualtId);
    const [currentRoom, setCurrentRoom] = useState({});

    const onChangeHandlerII = (e) => {
        const {name, value} = e.target;
        setId({...id, [name]:value});

    }

    const callGetRoomInfo = async() => {
        try{
            const data = await getRoomInfo(id.id);
            console.log('admin', data);
            setCurrentRoom(data);

        } catch(error) {
            console.log('error', error);
        }

        
    };

//Making IsEmpty function dynamic so that the admin can have control over which rooms shall be displayed and which all shall not be displayed.
      

  const callUpdateIsEmpty = async () => {
    try{
        await updateIsEmpty(isEmpty, id);
    } catch(error) {
        console.log(error);
    }
  }
//fetching request data;
const fetchRequests = async() => {
    try {
       const requestData =  await viewRequests();
       console.log(requestData);
    } catch(error){
        console.log(error);
    }
}

      



    return (
        <div className="STEP 1">
          <div>
            <button onClick={fetchRequests}>fetch requests</button>
          </div>
        
        <form>
            <label>features :</label>
            

            <label >
             all time water:
             <label>
             true --  
                 <input onChange={onChangeHandler} type="boolean" name="all_time_water" value={true} placeholder="true"/>
             </label>
            <label>
            false--
                <input onChange={onChangeHandler} type="boolean" name="all_time_water" value={false} placeholder="false" /> 
             </label>
            
             </label>
             <br />

             
             <label >
              furnished:
              <label>
              true --
              <input onChange={onChangeHandler} type="radio" name="furnished" value={true} placeholder="true"/>
              </label>
              
              <label>
              false --
                <input onChange={onChangeHandler} type="radio" name="furnished" value={false} placeholder="false" /> 
            </label>
              
              </label>
              <br />

              <label >
              geyser:
              <label>
                true --
                <input onChange={onChangeHandler} type="radio" name="geyser" value={true} placeholder="true"/>
              
              </label>
               false --
              <input onChange={onChangeHandler} type="radio" name="geyser" value={false} placeholder="false" /> 
              </label>
              <br />

              <label >
              inverter:
              <label>
              true --
              <input onChange={onChangeHandler} type="radio" name="inverter" value={true} placeholder="true"/>
              </label>
              <label>
              false --
              <input onChange={onChangeHandler} type="radio" name="inverter" value={false} placeholder="false" /> 
              </label>
              </label>
              <br />

              
              <label >
              wifi:
              <label>
                true --
              <input onChange={onChangeHandler} type="radio" name="wifi" value={true} placeholder="true"/>
              </label>

              <label>
                false --
              <input onChange={onChangeHandler} type="radio" name="wifi" value={false} placeholder="false" /> 
              </label>
              </label>
              <br />

              <label >
              houseId: 
              <input onChange={onChangeHandler} type="text" name="houseId" value={formFields.houseId} placeholder="houseId"/>
             </label>
              <br />

            

              
              <label >
              price: 
              <input onChange={onChangeHandler} type="text" name="price" value={formFields.price} placeholder="price"/>
             </label>
              <br />

              
              <label >
              roomDescription: 
              <input onChange={onChangeHandler} type="text" name="roomDescription" value={formFields.roomDescription} placeholder="brief room description"/>
             </label>
              <br />

            

              <label >
              type: 
              <input onChange={onChangeHandler} type="text" name="type" value={formFields.type} placeholder="eg. 1BHK"/>
             </label>
              <br />

              <label >
              washroom: 
              <input onChange={onChangeHandler} type="text" name="washroom" value={formFields.washroom} placeholder="Indian/western"/>
             </label>
              <br />

              <button onClick={onSubmitHandler}> Create house Document </button>

        </form>
         <dv>
         </dv>
            <div className="Step 2 ">
                <h1>STEP 2:  Upload Images Here </h1>
                <input type="file" accept="image/*" multiple onChange={handleImageChange} placeholder="upload images by pressing me"/>
                <button onClick={callUploadImages}> callUploadImages </button>
            </div>

         <div className="Step 3">
            <h1>STEP 3: Click this to update the firestore</h1>
           
            <button onClick={callFetchUrls}> callUpdateImageBox  </button>
          </div>

          <div className="Step 3">
            <h1>STEP 4: Update DashBoard</h1>
            <input type="text" placeholder="Enter Room Id to be Updated" onChange={onChangeHandlerII} name="id" value={id.id} />
            <button onClick={callGetRoomInfo}> GetRoomInfo  </button>
            {currentRoom && (
                <div className="grid grid:col-4">
                  <h1>{currentRoom.houseId}</h1>
                  {currentRoom.imageBox && currentRoom.imageBox.map((img, index) => (
                    <img className="w-50 h-10" src={img} key={index} alt="yo" />
                  ))}
                </div>
              )}
          </div>
          <div>
          <label >
          IsEmpty:
          <label>
          true --  
              <input onChange={onChangeHandler} type="radio" name="isEmpty" value={true} placeholder="true"/>
          </label>
         <label>
         false--
             <input onChange={onChangeHandler} type="radio" name="isEmpty" value={false} placeholder="false" /> 
          </label>
         
          </label>
          <button onClick={callUpdateIsEmpty}>Click to update the present state of the room </button>
          </div>
        </div>
       
    )
}
export default Admin;