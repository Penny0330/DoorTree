export function useUploadImage() {
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)
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
