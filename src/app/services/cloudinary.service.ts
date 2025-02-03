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
  // CloudinaryService

uploadToCloudinaryWithProgress(file: File, progressCallback: (progress: number) => void): Promise<string> {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'storePodcast');  // Utilisez votre upload preset Cloudinary

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.cloudinary.com/v1_1/ddv9diq1u/upload', true);

    // Suivi de la progression de l'upload
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = Math.round((event.loaded / event.total) * 100);
        progressCallback(progress); // Mettre à jour le pourcentage de progression
      }
    };

    // Lorsque l'upload est terminé avec succès
    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log('File uploaded successfully:', response.secure_url);
        resolve(response.secure_url); // Retourner l'URL du fichier téléchargé
      } else {
        reject(new Error('Upload failed'));
      }
    };

    // Gérer les erreurs
    xhr.onerror = () => reject(new Error('Upload failed'));

    // Envoi du formulaire
    xhr.send(formData);
  });
}

}
