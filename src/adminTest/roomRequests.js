import { useState } from "react";
import { deleteRequests, deleteRequestsData, individualRequests, individualRoomRequest, unApprovedRooms, uploadToRoomData } from "../utils/firebase";

export const UnapprovedRooms = () => {
    const defaultFormFields = {
        features: {
          gyeser: false,
          furnished: false,
          wifi: false,
          inverter: false,
          all_time_water: false
        },
        fullName: "",
        houseId: "MGA011",
        imageBox: [],
        isApproved: false,
        isEmpty: true,
        liked: "",
        price: "",
        rentPaid: false,
        roomDescription: "",
        roomNumber: "5",
        roomReviews: {},
        stayedFrom: "",
        tenantName: "Abishek Bista",
        tenant_adhar: [],
        type: "",
        washroom: ""
      };
    const [emailList, setEmailList] = useState([]);
    const [roomId, setRoomId] = useState({roomId: ''});
    const [data, setData] = useState(defaultFormFields)
    
    const fetchEmailList = async () => {
        try {
        const objectData = await unApprovedRooms();
        const list = Object.values(objectData).map((item) =>({
          houseId: item.houseId,
          roomNumber: item.roomNumber

        })) 
        console.log(list);
        setEmailList(list);
        } catch (error) {
          console.log(error);
        }
      };

      const onChangeHandler = async (e) => {
        const {name, value} = e.target;
        setRoomId({...roomId, [name]: value });
        console.log(roomId);
      }

      const fetchIndividualRequests = async() => {
        const dataDoc = await individualRoomRequest(roomId);
        console.log(dataDoc);
        setData(data);
        console.log('data', data);

      }

      const acceptRequest = async() => {
        await uploadToRoomData(data, roomId)
      }

      const rejectRequest = async() => {
        await deleteRequestsData(roomId);
      }


    return(
        <div>
            <h1> Respond to the unresponded room's requests</h1>
            <button onClick={fetchEmailList}>view Requests </button>
            <div>
      
      {emailList.map((item, index) => (
        <div key={index}>
          <p>House ID: {item.houseId}</p>
          <p>Room Number: {item.roomNumber}</p>
          <br/>
        </div>
      ))}
    </div>

    <div>
        <div>      
    {data && (
        <div className="grid grid:col-4">
          <h1>FUll NANME : {data.fullName}</h1>
          <h1>EMAIL ID:  {data.emailId} </h1>
          <h1>House Id : {data.houseId}</h1>

          {data.imageBox && data.imageBox.map((img, index) => (
            <img className="w-50 h-10" src={img} key={index} alt="yo" />
          ))}
    
    </div>
    )}  
    </div>

        <div> 
            <h1> fetch Room Id </h1>
            <input onChange={onChangeHandler} placeholder="enter room ID" name="roomId" value={roomId.roomId} /> 
            <button onClick={fetchIndividualRequests}> ViewInfo </button>
        </div>

        <div>
            <button onClick={acceptRequest}> Accept Request </button>
            <button onClick={rejectRequest}> Reject Request </button>
        </div>
    </div>
</div>
        
    )
}