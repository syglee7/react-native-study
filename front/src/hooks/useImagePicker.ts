import ImageCropPicker from 'react-native-image-crop-picker';
import {getFormDataImages} from '@/utils';
import useMutateImages from '@/hooks/queries/useMutateImages.ts';
import {useState} from 'react';
import {ImageUri} from '@/types';
import {Alert} from 'react-native';

interface UseImagePickerProps {
  initialImage: ImageUri[];
}

function useImagePicker({initialImage = []}: UseImagePickerProps) {
  const [imageUris, setImageUris] = useState(initialImage);
  const uploadImages = useMutateImages();

  const addImageUris = (uris: string[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert('이미지 갯수 초과', '추가 가능한 이미지는 최대 5개입니다.');
      return;
    }

    setImageUris(prev => [
      ...prev,
      ...uris.map(uri => ({
        uri,
      })),
    ]);
  };

  const handleChange = () => {
    ImageCropPicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);
        uploadImages.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          // 사용자가 취소한 경우가 아닐때만 에러 메세지 표시
        }
      });
  };

  return {
    imageUris,
    handleChange,
  };
}

export default useImagePicker;
