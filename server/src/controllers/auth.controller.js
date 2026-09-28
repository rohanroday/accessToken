import bcrypt from "bcrypt";
import userModel from "../models/auth.model.js";
import sessionModel from "../models/session.model.js";
import { generateToken, verifyRefreshToken, verifyAccessToken } from "../utils/auth.utils.js";

export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  const ifUser = await userModel.findOne({ email });
  if (ifUser) {
    return res.status(400).json({
      message: "Email already exists",
      success: false,
    });
  }
  const user = await userModel.create({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });
  const token = generateToken(user._id);
  const session = await sessionModel.create({
    userId: user._id,
    refreshTokenHash: await bcrypt.hash(token.refreshToken, 10),
  });
  res.cookie("refreshToken", token.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res
    .status(200)
    .json({
      message: "User registered successfully",
      user,
      accessToken: token.accessToken,
    });
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      success: false,
    });
  }
  const passwordValid = await bcrypt.compare(password, user.password);
  if (!passwordValid) {
    return res.status(400).json({
      message: "Password is not valid",
      success: false,
    });
  }
  const token = generateToken(user._id);

  await sessionModel.findOneAndUpdate(
    { userId: user._id },
    {
      refreshTokenHash: await bcrypt.hash(token.refreshToken, 10),
    },
    {
      upsert: true,
    },
  );
  res.cookie("refreshToken", token.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res
    .status(200)
    .json({
      message: "User logged in successfully",
      user,
      accessToken: token.accessToken,
    });
}

export async function refresh(req, res) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is not provided",
      success: false,
    });
  }
  try {
    const decoded = verifyRefreshToken(refreshToken);
    const session = await sessionModel.findOne({ userId: decoded.userId });
    if (!session) {
      return res.status(401).json({
        message: "Refresh token is not valid 1",
        success: false,
      });
    }
    const isValidRefreshToken = await bcrypt.compare(
      refreshToken,
      session.refreshTokenHash,
    );
    if (!isValidRefreshToken) {
      await session.deleteMany({ userId: decoded.userId });
      return res.status(401).json({
        message: "Refresh token is not valid 2",
        success: false,
      });
    }
    const token = generateToken(decoded.userId);
    await sessionModel.findOneAndUpdate(
      { userId: decoded.userId },
      {
        refreshTokenHash: await bcrypt.hash(token.refreshToken, 10),
      },
      {
        upsert: true,
      },
    );
    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(200)
      .json({
        message: "Refresh token is refreshed",
        accessToken: token.accessToken,
      });
  } catch (error) {
    return res.status(401).json({
      message: "Invaild refresh token 3",
      success: false,
    });
  }
}

export async function getUser(req, res) {
  const authHeader = req.headers.authorization;

if (!authHeader) {
    return res.status(401).json({
        message: "Authorization header is missing",
        success: false,
    });
}

const accessToken = authHeader.split(" ")[1];
  if (!accessToken) {
    return res.status(401).json({
      message: "Access token is not provided",
      success: false,
    });
  }
  try {
    const decoded = verifyAccessToken(accessToken);
    const user = await userModel.findById(decoded.userId);
    return res.status(200).json({
      message: "User is logged in",
      data: {
        user: {
          email: user.email,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Access token is not valid",
      success: false,
    });
  }
}
