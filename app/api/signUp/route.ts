import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { writeClient } from "@/sanity/lib/write-client";
import { CHECK_FOR_EXISTING_USER } from "@/sanity/lib/queries";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    //pridobi podatke
    const { name, email, password, surname, username } = await req.json();

    //preveri da je vse vpisano
    if (!name || !surname || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Preveri ali uporabnik že obstaja
    const existingUser = await writeClient.fetch(CHECK_FOR_EXISTING_USER, { email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //spremeni image v buffer, kaj je binarni "raw" sistem za slike in jo pripravi za shranjevanje v bazo. Sliko dobi iz public
    const filePath = path.join(process.cwd(), "public", "defaultPFP.jpg");
    const buffer = fs.readFileSync(filePath);

    const imageAsset = await writeClient.assets.upload(
    "image",
    buffer,
    { filename: "defaultPFP.jpg", contentType: "image/jpeg" }
    )
     console.log("Image asset:", imageAsset);
    
  //naredi novega uporabnika
  const newUser = await writeClient.create({
    _type: "user", 
    name,
    surname,
    username,
    email,
    password: hashedPassword,
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: imageAsset._id,
      }
    }
  });
  //odgovor, ali je error ali uspesno
    return NextResponse.json(
      { message: "User created successfully", userId: newUser._id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
      
    );
  }
}
