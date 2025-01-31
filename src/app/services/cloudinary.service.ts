import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {

  async uploadToCloudinary(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "storePodcast");

    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/ddv9diq1u/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("File uploaded successfully:", data.secure_url);
      return data.secure_url;  
    } catch (error) {
      console.error("Error during upload:", error);
      throw error;  
    }
  }
}
