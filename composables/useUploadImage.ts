import imageCompression from 'browser-image-compression'

export function useUploadImage() {
  const uploadImage = async (file: File): Promise<string> => {
    // compress image
    const options = {
      maxSizeMB: 0.7, // 最大文件大小（MB）
      maxWidthOrHeight: 1024, // 最大寬高
      useWebWorker: true, // 使用 Web Worker 加速
    }

    let fileToUpload: File = file
    try {
      fileToUpload = await imageCompression(file, options)
    } catch (error) {
      console.error('壓縮圖片失敗，將使用原始檔案上傳:', error)
    }

    const formData = new FormData()
    formData.append('file', fileToUpload)
    formData.append('upload_preset', 'rf8vjm9x')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dc8zkjbya/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error('Failed to upload image')
      }

      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  return { uploadImage }
}
