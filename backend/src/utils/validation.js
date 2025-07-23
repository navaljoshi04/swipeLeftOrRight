import validator from "validator";
const validateSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  //validate the firstname:
  if (!firstName) {
    throw new Error("Enter a first Name");
  }
  //validation of email and password
  else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid ...");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }
};

export const validateEditProfile=(req)=>{
  const allowedEditFields= ["firstName", "lastName", "about", "skills", "gender", "photoUrl"];
  const data= req.body; 
  const isEditAllowed= Object.keys(data).every((key)=>allowedEditFields.includes(key));
  return isEditAllowed; 
}

export default validateSignUpData;
