import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {

    // get user details from frontend
    // validation - not empty
    // check if user already exists - email, username
    // check for images, check for avatar
    // upload them to cloudinary, check avatar successfully uploaded ?
    // create user object - create entry in db
    // store data in db
    // remove password and refresh token field from response
    // check for user creation 
    // return res


    // get user details from frontend
    const {username, email, fullName, password} = req.body      // form data n json data
    console.log("username: ", username);
    console.log("email: ", email);
    console.log("fullName: ", fullName);
    console.log("password: ", password);


    // validation
    if([fullName, email, username, password].some((field)=>field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }


    // check if user already exists
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })

    if(existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }


    // check for images, check for avatar  (multer gives us access to req.files)
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverimage[0]?.path;

    if(!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }


    // upload them to cloudinary, check avatar successfully uploaded ?
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }
    

    // create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check for user creation 
    if(!createdUser) {
        throw new ApiError(500, "somethimg went wrong while registering the user")
    }

    // return response
    res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export {registerUser}