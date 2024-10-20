import React from 'react';
import {StyleSheet, View} from 'react-native';
import useGetInfinitePosts from '@/hooks/queries/useGetInfinitePosts.ts';

function FeedList() {
  const {data: posts} = useGetInfinitePosts();
  return <View></View>;
}

const styles = StyleSheet.create({});

export default FeedList;
