import React from "react";
import { useForm } from "react-hook-form";
import {
    Box,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    Checkbox,
    Select,
    Text,
    useToast


} from '@chakra-ui/react'

import useResource from "../../hooks/useResource";

const LoadCourses = ({ course }) => {
    
    const { register, handleSubmit } = useForm();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { createResource } = useResource(`${process.env.REACT_APP_HEROKU_ROOT}/rewards/`)


    const onSubmit = (data) => {
      
        const onSubmitSuccess = () => {

            toast({
                position: 'bottom',
                title: 'Reward Added',
                description: 'Reward Item Added 🎊',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

        };
        data.names.map(value => {
            let info = {
                "owner_id": value,
                "reward": data.rewards
            }
            createResource(info).then(result => {
                if (result.status === 201) {
                    onClose()
                    onSubmitSuccess()
                }
            });
        })
    }

    return (
        <Box>




           
                <Button onClick={onOpen} bg='#140A4F' color='white' m={'12px 7px 12px 7px'} maxW="220" minW='220' minH='70px' fontSize='15' key={course.id}>
                    {course.code}
                </Button>

                <Modal size='full' isOpen={isOpen} onClose={onClose} >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ModalOverlay />
                        <ModalContent color='#140A4F'>
                            <ModalHeader>
                                <Text fontSize='l' fontWeight='extrabold'>
                                    {course.code}
                                </Text>
                            </ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>

                                <Select placeholder="Rewards" name="rewards" {...register("rewards")}>
                                    <option value="Waive Late Assignment Penalty">Waive Late Assignment Penalty</option>
                                    <option value="Waive Late of class penalty">Waive Late of class penalty</option>
                                    <option value="+1 mark on any submission">+1 mark on any submission</option>
                                    <option value="Resubmit attempt">Resubmit attempt</option>
                                </Select>

                                {course.course.map(student => {
                                    
                                    return (
                                        <FormControl key={student.id}>

                                            <Checkbox {...register("names")} fontSize='md' fontWeight='medium' mt='2' value={student.id} name={"names"}>{student.first_name} {student.last_name}</Checkbox>

                                        </FormControl>
                                    )
                                })}



                            </ModalBody>

                            <ModalFooter>
                                <Button variant="ghost" mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button colorScheme="blue" type='submit'>Submit</Button>
                            </ModalFooter>
                        </ModalContent>
                    </form>
                </Modal>

            






        </Box>
    )
}

export default LoadCourses;