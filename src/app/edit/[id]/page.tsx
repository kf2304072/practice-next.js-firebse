"use client";
import { Box, Button, Flex, Spacer, Text, Textarea } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/libs/firebase';


interface Data {
  title: string;
  detail: string;
  create: string;
  update: string;
}

const edit:React.FC = () =>{

  const router = useRouter();
  const [data, setData] = useState<Data>({ title: '', detail: '', create: '', update: '' });
  
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("taskId");

  useEffect(() => {
    console.log("URLパラメータのtaskId:", categoryName);
    if (categoryName) {
      const fetchData = async () => {
        const docRef = doc(db, 'todo_bb', categoryName as string);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          setData(docSnap.data() as Data);
        } else {
          console.log("No such document!");
        }
      };
  
      fetchData();
    }
  }, [categoryName]);

  const updateData = async () => {
    // Firestore に保存するデータを更新
    const docRef = doc(db, 'todo_bb', categoryName as string);
    await updateDoc(docRef, {
      title: data.title,
      detail: data.detail,
      update: new Date().toISOString() // 更新日時を現在の日時に設定
    });
    // 更新後に1ページ目に戻る
    router.push('/top'); // 1ページ目のパスに適宜変更してください
  };
  return (
      <Box as="main" w="1280px" mx="auto">
        <Flex
          as="header"
          h='80px'
          bg="#68D391"
          alignItems="center"
          px={5}>
          <Box
            w="127px"
            h="56px"
            display="flex"
            alignItems="center"
            justifyContent="center">
            <Text fontSize="48px" fontWeight="bold" marginLeft="150px">TODO</Text>
          </Box>
          <Spacer/>
          <Box marginRight="50px">
            <Button
              w="120px"
              h="56px"
              bg="#D9D9D9"
              borderWidth="1px"
              borderRadius="10px"
              cursor="pointer"
              fontSize="24px"
              fontWeight="bold">
              LOGOUT
            </Button>
          </Box>
        </Flex>

        <Flex mt={4} ml="100px">
          <Box ml="968px">
            <Button
              w="112px"
              h="40px"
              bg="#68D391"
              borderRadius="20px"
              cursor="pointer"
              fontWeight="bold"
              fontSize="18px">
              Back
            </Button>
          </Box>
        </Flex>

        <Box as="section" mt={2} ml="100px">
          <Text fontSize="24px" fontWeight="bold">TITLE</Text>
          <Textarea
            w="1080px"
            h="72px"
            size="lg"
            fontSize="24px"
            fontWeight="bold"
            lineHeight="1.25"
            padding="6px"
            resize="none"
            borderRadius="12px"/>
        </Box>

        <Box as="section" mt={6} ml="100px">
          <Text fontSize="24px" fontWeight="bold">DETAIL</Text>
          <Textarea
            w="1080px"
            h="204px"
            size="lg"
            fontSize="24px"
            fontWeight="bold"
            lineHeight="1.25"
            padding="6px"
            resize="none"
            borderRadius="12px"/>
        </Box>

        <Flex mt={4} ml="100px">
          <Flex>
            <Box mr={5}>
              <Text fontWeight="bold">Create</Text>
              <Text fontWeight="bold">2023-01-01 00:00</Text>
            </Box>
            <Box>
              <Text fontWeight="bold">Update</Text>
              <Text fontWeight="bold">2023-01-01 00:00</Text>
            </Box>
          </Flex>

          <Box ml="660px">
            <Button
              w="112px"
              h="40px"
              bg="#25855A"
              borderRadius="20px"
              cursor="pointer"
              fontWeight="bold"
              color="white"
              fontSize="18px">
              UPDATE
            </Button>
          </Box>
        </Flex>
      </Box>
  );
};

export default edit;
