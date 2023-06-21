
import { useState } from "react";
import { createRequestDocument, uploadLegalDocument, uploadLegalDocumentII, fetchAdharUrl, fetchHouseDocUrl } from "../utils/firebase";


const RegisterOwner = () => {
  const defaultFormFields = {
    fullName: "",
    emailId: "",
    roomNumbers: "",
    adharCard: [],
    houseDoc: []
  };

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { fullName, emailId, roomNumbers } = formFields;
  const [currentPage, setCurrentPage] = useState(1);

  const [adhar, setAdhar] = useState([]);
  const [house, setHouse] = useState([]);

  const onChangeHandlerII = (e) => {
    const files = e.target.files;
    setHouse([...house, ...files]);
    console.log(house);
  }

  const onChangeImageHandler = (e) => {
    const files = e.target.files;
    setAdhar([...adhar, ...files]);
    console.log(adhar);
  }

  const onChangeHandler = (e) => {
    const { value, name } = e.target;
    setFormFields({ ...formFields, [name]: value });
    console.log(formFields);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();


    try {
      await createRequestDocument(formFields);
      setCurrentPage(2); // Move to the Thank You page
    } catch (error) {
      console.log(error);
    }
  };

  const uploadAdharCard = async (e) => {
    e.preventDefault();
    try {
      await uploadLegalDocument(adhar, emailId);
      alert('Adhar Card Upload Success');

    } catch (error) {
      console.log(error);
    }
  }

  const uploadHouseDocument = async (e) => {
    e.preventDefault();
    try {
      await uploadLegalDocumentII(house, emailId);
      alert('House Document Upload Success');
      setCurrentPage(3); // Move to the Thank You page after uploading House Document
    } catch (error) {
      console.log(error);
    }
  }

  const adharUrlUpdate = async () => {

    try {
      await fetchAdharUrl(emailId);
    } catch (error) {
      console.log(error);
    }
  }

  const houseDocUrlUpdate = async () => {
    try {
      await fetchHouseDocUrl(emailId);
      setCurrentPage(3);
    } catch (error) {
      console.log(error);
    }
  }

  const nextPage = () => {
    setCurrentPage(currentPage + 1);

  };

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (


    <div className="flex items-center md:h-[2/3] w-screen justify-center content-between bg-[#00CCCC]">
      {currentPage === 1 && (
        <form className="bg-white md:w-1/2 h-screen justify-center items-center  w-screen border-[1px]  flex  rounded-lg">
          <div className=" font-medium text-gray-700 p-20">
            <h1 className="text-3xl font-Paytone pb-2">
              Owner Registration👋
            </h1>
            <p className="text-lg pb-2 mt-2 font-latoBold text-gray-500">
              Register your building to avail our services for free
            </p>
            <div className="mt-6 font-latoRegular">
              <div className="pb-4">
                <label className="block text-sm pb-2 font-bold">
                  Name
                  <input
                    className="flex border-2 border-gray-500 p-2 rounded-md w-1/2 focus:outline-[#00CCCC] focus:ring-[#00CCCC]"
                    type="text"
                    placeholder="Enter your name"
                    onChange={onChangeHandler}
                    name="fullName"
                    value={fullName}
                  />
                </label>
              </div>

              <div className="pb-4 font-bold">
                <label className="block text-sm pb-2">
                  2. No of Rooms
                  <input
                    className="flex border-2 border-gray-500 p-2 rounded-md w-1/2 focus:outline-[#00CCCC] focus:ring-[#00CCCC]"
                    type="text"
                    placeholder="No. of Rooms"
                    onChange={onChangeHandler}
                    name="roomNumbers"
                    value={roomNumbers}
                  />
                </label>
              </div>

              <div className="pb-4 font-bold">
                <label className="block text-sm pb-2">
                  3. Email
                  <input
                    className="flex border-2 border-gray-500 p-2 rounded-md w-1/2 focus:outline-[#00CCCC] focus:ring-[#00CCCC]"
                    type="text"
                    placeholder="Your email Id"
                    onChange={onChangeHandler}
                    name="emailId"
                    value={emailId}
                  />
                </label>
              </div>

              <div className="pb-4 font-Roboto">
                <label className="block font-Paytone text-lg pb-0" htmlFor="terms">
                  Terms And Services
                </label>
                <div className="">
                  <input
                    type="checkbox"
                    name="terms"
                    value="checked"
                    className="h-5 w-5 text-[#00CCCC] focus:border-[#00CCCC] focus:ring-[#00CCCC]"
                  />
                  <p className="text-sm font-latoBold pt-4 text-gray-500">
                    I agree to the Terms and Service provided by Rentz
                  </p>

                  <button onClick={onSubmitHandler}>Submit</button>
                </div>
              </div>

              {/* ... */}
              <button
                className="flex p-[20px] bg-[#00CCCC] font-latoBold text-sm text-white py-3 mt-6 rounded-lg hover:bg-[#00DDDD]"
                onClick={nextPage}
              >
                Next
              </button>

            </div>

          </div>
        </form>
      )}

      {currentPage === 2 && (
        <div>
          <div className="bg-gray-200 p-8 rounded-lg">
            <div className="mb-8 ">
              <h1 className="text-2xl font-bold">Upload your Aadhar Card</h1>
              <input
                className="mt-4"
                onChange={onChangeImageHandler}
                type="file"
                accept="images/*"
                multiple
                placeholder="Upload your Aadhar photos"
              />
              <div className="flex mt-4">
                <button
                  onClick={uploadAdharCard}
                  type="button"
                  className="mr-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Upload
                </button>
                <button
                  onClick={adharUrlUpdate}
                  type="button"
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Commit
                </button>
              </div>
            </div>

            <div className="flex flex-col text-center items-center">
              <h1 className="text-2xl font-bold mb-4">Upload your House Document</h1>
              <input
                className="w-full py-2 px-4 border border-gray-300 rounded-lg mb-4"
                onChange={onChangeHandlerII}
                type="file"
                accept="images/*"
                multiple
                placeholder="Upload your House Document photos"
              />
              <div className="flex">
                <button
                  onClick={uploadHouseDocument}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Upload
                </button>
                <button
                  onClick={houseDocUrlUpdate}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                  Commit
                </button>
              </div>
            </div>
          </div>

          <button
            className="flex p-[20px] bg-[#00CCCC] font-latoBold text-sm text-white py-3 mt-6 rounded-lg hover:bg-[#00DDDD]"
            onClick={previousPage}
          >
            Previous
          </button>
          <button
            className="flex p-[20px] bg-[#00CCCC] font-latoBold text-sm text-white py-3 mt-6 rounded-lg hover:bg-[#00DDDD]"
            onClick={nextPage}
          >
            Next
          </button>
        </div>
      )}


      {currentPage === 3 && (
        <div className="bg-gray-200 p-8 rounded-lg">
          {/* Thank You Page */}
          <h1 className="text-3xl ">Thank You</h1>
          <p className="text-lg mt-4 ">Your registration has been submitted successfully.</p>
          <button
            className="flex p-[20px] bg-[#00CCCC] font-latoBold text-sm text-white py-3 mt-6 rounded-lg hover:bg-[#00DDDD]"
            onClick={() => setCurrentPage(1)}
          >
            Go Back to Registration
          </button>
        </div>
      )}

    </div>

  );
};

export default RegisterOwner;