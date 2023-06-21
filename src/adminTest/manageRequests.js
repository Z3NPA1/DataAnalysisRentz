
import { useState, useEffect, Fragment } from "react";
import { deleteRequests, viewRequests } from "../utils/firebase";
import { individualRequests, createApprovedAdmins, mergeHouseId } from "../utils/firebase";


const ManageRequests = () => {

    const defaultFormFields = {
        fullName: "",
        emailId: "",
        roomNumbers: "",
        adharCard: [],
        houseDoc: []
      };

    const [emailList, setEmailList] = useState([]);
    const [adminData, setAdminData] = useState(defaultFormFields);
    const [data, setData] = useState(defaultFormFields)

    const [email, setEmail] = useState({email: ''});
    const [uniqueId, setUniqueId] = useState({uniqueId: ''});
    
  
  
    
      const fetchEmailList = async () => {
        try {
        const objectData = await viewRequests();
        const list = Object.values(objectData).map((item) => item.emailId);
        console.log(list);
        setEmailList(list);
        } catch (error) {
          console.log(error);
        }
      };

      
        const onChangeHandler = (e) => {
            const { name, value } = e.target;
            setEmail((prevEmail) => ({ ...prevEmail, [name]: value }));
            console.log(email);
          };
      
          const callIndividualRequests = async () => {
            const data = await individualRequests(email);
            
            setData(data);

            console.log(data);
          } 
      
//creating approved admins
          const callCreateApprovedAdmins = async() => {
              
             try{
                await createApprovedAdmins(data, data.emailId);
                console.log('data shifting success');
              await deleteRequests(data.emailId)
             } catch(error) {
                console.log(error);
             }

          }
//onChange Handler II
          const onChangeHandlerII = async(e) => {
            const {name, value} = e.target;
            setAdminData({...adminData, [name]:value })
            console.log(adminData)
          }
//deleting the emails

const callDeleteRequests = async() => {
    try{
        await deleteRequests(data.emailId);
    } catch(error) {
        console.log(error);
    }
}
const uniqueIdHandler = (e) => {
    const {name, value} = e.target;
    setUniqueId({...uniqueId, [name]:value });
    console.log(uniqueId);
    
}
const callMergeHouseId = async () => {
    try{
        await mergeHouseId(uniqueId.uniqueId, data.emailId);
    } catch(error) {
        console.log(error);
    }
}
     
  
    return (
      <div>
        <h1>List of Email IDs</h1>
        <button onClick={fetchEmailList}> View Requests </button>
      
        <div>
        {emailList.map((emailId, index) => (
          <h1 key={index}>Email ID: {emailId} </h1>
        ))}
      </div>

            <div> 
                <h1> Respond to the requests </h1> 
                <h3> Enter email id of the sender you want to respond</h3>
                <div>
                    <input onChange={onChangeHandler} placeholder="email" type="email" name="email" value={email.email} />
                    <button onClick={callIndividualRequests}>fetch request</button>
                    
                        
                    {data && (
                        <div className="grid grid:col-4">
                          <h1>FUll NANME : {data.fullName}</h1>
                          <h1>EMAIL ID:  {data.emailId} </h1>

                          {data.adharCard && data.adharCard.map((img, index) => (
                            <img className="w-50 h-10" src={img} key={index} alt="yo" />
                          ))}
                          
                            <input type="text" onChange={onChangeHandlerII} name="houseID" value={adminData.houseId} />
                            <button onClick={callCreateApprovedAdmins}> accept Request </button>
                            <button onClick={callDeleteRequests}> Reject Request </button>
                            
                          

                        </div>
                      )}
            </div>

            <div>
                <h2>set Apartment Unique Id </h2>
                <input placeholder="uniqueId" onChange={uniqueIdHandler} name="uniqueId" value={uniqueId.uniqueId}/>
                <button onClick={callMergeHouseId}> mergeUniqueId</button>
            </div>


        </div>
      </div>
    );
  };
  
  export default ManageRequests;