import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator.tsx';
import {colors, mapNavigations} from '@/constants';
import InputField from '@/components/common/InputField.tsx';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '@/components/common/CustomButton.tsx';
import useForm from '@/hooks/useForm.ts';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost.ts';
import {MarkerColor} from '@/types/domain.ts';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight.tsx';
import useGetAddress from '@/hooks/useGetAddress.ts';
import MarkerSelector from '@/components/post/MarkerSelector.tsx';
import ScoreInput from '@/components/post/ScoreInput.tsx';
import DatePickerOption from '@/components/post/DatePickerOption.tsx';
import useModal from '@/hooks/useModal.ts';
import ImageInput from '@/components/post/ImageInput.tsx';
import usePermission from '@/hooks/usePermission.ts';
import useImagePicker from '@/hooks/useImagePicker.ts';
import PreviewImageList from '@/components/common/PreviewImageList.tsx';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;
  const descriptionRef = useRef<TextInput | null>(null);
  const createPost = useMutateCreatePost();
  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const [score, setScore] = useState(5);
  const [date, setDate] = useState(new Date());
  const [isPicked, setIsPicked] = useState(false);
  const dateOption = useModal();
  const address = useGetAddress(location);
  const imagePicker = useImagePicker({
    initialImage: [],
  });
  usePermission('PHOTO');

  const handleConfirmDate = () => {
    setIsPicked(true);
    dateOption.hide();
  };

  const handleChangeDate = (pickedDate: Date) => {
    setDate(pickedDate);
  };

  const handleSelectMarker = (name: MarkerColor) => {
    setMarkerColor(name);
  };

  const handleChangeScore = (value: number) => {
    setScore(value);
  };

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };
    createPost.mutate(
      {address, ...location, ...body},
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <InputField
            value={address}
            disabled
            icon={
              <Octicons name="location" size={16} color={colors.GRAY_500} />
            }
          />
          <CustomButton
            label={isPicked ? getDateWithSeparator(date, '. ') : '날짜 선택'}
            variant="outlined"
            size="large"
            onPress={dateOption.show}
          />
          <InputField
            placeholder="제목을 입력하세요."
            error={addPost.errors.title}
            touched={addPost?.touched.title}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputField
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
          <View style={styles.imageViewer}>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
              showOption={true}
            />
          </View>
          <DatePickerOption
            isVisible={dateOption.isVisible}
            date={date}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    gap: 20,
    marginBottom: 20,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    marginBottom: 10,
  },
  imageViewer: {
    flexDirection: 'row',
  },
});

export default AddPostScreen;
