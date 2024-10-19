import React from 'react';
import HeaderButton from '@/components/HeaderButton.tsx';

function AddPostHeaderRight(onSubmit: () => void) {
  return <HeaderButton labelText="등록" onPress={onSubmit} />;
}

export default AddPostHeaderRight;
