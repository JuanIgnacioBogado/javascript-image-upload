const imagePreview = document.getElementById('img-preview');
const imageUploader = document.getElementById('img-uploader');
const progressBar = document.getElementById('progress-bar');
const progressValue = document.getElementById('progress-value');

const gifLoading = 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif';
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/tuNombreDeUsuario/image/upload';
const upload_preset = 'tuUploadPreset';

imageUploader.addEventListener('change', async e => {
  const file = e.target.files[0];

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', upload_preset);

  imagePreview.src = gifLoading;
  progressValue.innerText = '0%';

  const {
    data: { secure_url }
  } = await axios.post(CLOUDINARY_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress({ total, loaded }) {
      const progress = Math.round((loaded * 100) / total);
      console.log('progress', progress);

      progressBar.setAttribute('value', progress);
      progressValue.innerText = `${progress}%`;
    }
  });
  imagePreview.src = secure_url;
});
