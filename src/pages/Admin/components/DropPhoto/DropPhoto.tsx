import React, { useState, useEffect } from 'react';
import uploadPhoto from 'apis/admin/photos/PhotosApis';

interface DropPhotoProps {
  onImageUpload: (url: string) => void;
  url: string;
}

const DropPhoto: React.FC<DropPhotoProps> = ({ onImageUpload, url }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null); 

  useEffect(() => {
    if (url) {
        console.log(url)
      setImageUrl(url); 
    } else {
      setImageUrl(null); 
    }
  }, [url]); 

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setLoading(true);
      setImageUrl(null); 
      try {
        const url = await uploadPhoto(file); 
        setImageUrl(url); 
        onImageUpload(url); 
      } catch (err) {
        setError('Failed to upload image');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: '250px',
        height: '200px',
        border: '2px dashed #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {!imageUrl && !loading && <span>Drop Photo...</span>}
      {loading && <p>Uploading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded Preview" style={{ width: '230px', maxHeight: '180px' }} />
        </div>
      )}
    </div>
  );
};

export default DropPhoto;
