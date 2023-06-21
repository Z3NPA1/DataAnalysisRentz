import React, { useState } from 'react';
import { addRequestRoomInfo, createApartmentDocument, createRoomData } from '../../utils/firebase';

export default function AdminAddDataForm() {
    
  const [formFields, setFormFields] = useState({
    ownerName: '',
    ownerPhoneNumber: '',
    ownerEmailId: '',
    houseId: '',
    rooms: [
      {
        roomId: '',
        price: '',
        roomDescription: '',
        buildingReviews: '',
        type: '',
        features: {
          water: false,
          furnished: false,
          gyeser: false,
          inverter: false,
          wifi: false,
        },
        liked: false,
        roomNumber: '',
        isEmpty: '',
        roomImgaeBox: [],
        roomReviews: '',
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormFields((prevFields) => ({
      ...prevFields,
      rooms: prevFields.rooms.map((room, index) =>
        index === 0 ? { ...room, [name]: checked } : room
      ),
    }));
  };

  const handleRoomInputChange = (e, roomIndex) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => {
      const updatedRooms = prevFields.rooms.map((room, index) =>
        index === roomIndex ? { ...room, [name]: value } : room
      );
      return {
        ...prevFields,
        rooms: updatedRooms,
      };
   
    });
  };
  
  const handleRoomImageChange = (event, roomIndex) => {
    const files = Array.from(event.target.files);
    const updatedRooms = formFields.rooms.map((room, index) => {
      if (index === roomIndex) {
        return {
          ...room,
          roomImageBox: files,
        };
      }
      return room;
    });
  
    setFormFields({
      ...formFields,
      rooms: updatedRooms,
    });
  };
  
  
  
  const callCreateApartmentDocument = async () => {
    console.log(formFields);
    const formDataSecond = await addRequestRoomInfo(formFields);
    await createApartmentDocument(formDataSecond);
    await createRoomData(formDataSecond.rooms);
  };

  return (
    <div>
      <label>
        Owner Name:
        <input
          type="text"
          name="ownerName"
          value={formFields.ownerName}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Owner Phone Number:
        <input
          type="text"
          name="ownerPhoneNumber"
          value={formFields.ownerPhoneNumber}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Owner Email ID:
        <input
          type="text"
          name="ownerEmailId"
          value={formFields.ownerEmailId}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        House ID:
        <input
          type="text"
          name="houseId"
          value={formFields.houseId}
          onChange={handleInputChange}
        />
      </label>
      <br />

      <h1>The Room Info Here</h1>
      {formFields.rooms.map((room, index) => (
        <div key={index}>
          <label>
            Room ID:
            <input
              type="text"
              name="roomId"
              value={room.roomId}
              onChange={(e) => handleRoomInputChange(e, index)}
            />
          </label>
          <br />
          <label>
            Price:
            <input
              type="text"
              name="price"
              value={room.price}
              onChange={(e) => handleRoomInputChange(e, index)}
            />
          </label>
          <br />
      
          <label>
          Room Images:
          <input
            type="file"
            name="roomImages"
            multiple
            onChange={(e) => handleRoomImageChange(e, index)}
          />
        </label>
      <br />

          </div>
      ))}
        <button onClick={callCreateApartmentDocument}>Submit</button>
     </div>
  )
      }