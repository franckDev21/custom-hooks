import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import SimulatorService from "../services/simulator.service";
import UserService from "../services/user.service";

type MODULE = "USER"|"SIMULATOR"

const useUploadeImage = (defaultImage?: string, module?: MODULE) => {

  const [hasImage, setHasImage] = useState(!!(defaultImage || false) ?? false);
  const [urlImg, setUrlImage] = useState(defaultImage ?? "");
  const [fileState,setFileState] = useState<File|null>(null)
  const [sendingImg,setSendingImg] = useState(false)

  const uploadeImage = async (id: number) => {
    if(fileState){
      let formData : FormData;
      setSendingImg(true)

      try {
        let response;
        switch (module || 'USER') {
          case 'SIMULATOR':
            formData = new FormData();
            formData.append("logo", fileState);
      
            response = await SimulatorService.updatePicture(id,formData)
            break;
          default:
            formData = new FormData();
            formData.append("picture", fileState);
      
            response = await UserService.updatePicture(id,formData)
            break;
        }
        
        toast.success(response.data.message)
      } catch (error) {
        console.log(error);
        
      } finally {
        setSendingImg(false)
      }
      
    } else {
      toast.error('Vous devez choisir une image')
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setHasImage(!!(defaultImage || false) ?? false);
      setUrlImage(defaultImage ?? "");
      setFileState(null)
      return;
    }

    setHasImage(true);
    setFileState(file);
    let url = URL.createObjectURL(file);
    setUrlImage(url);
  };
  

  return {
    hasImage,
    uploadeImage,
    urlImg,
    handleImageChange,
    sendingImg,
    fileState
  };
};

export default useUploadeImage;
