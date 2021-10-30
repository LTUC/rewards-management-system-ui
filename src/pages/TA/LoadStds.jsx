import React, { useState } from "react";
import {
    Box,
    Flex,
    Spinner,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    Select,
} from '@chakra-ui/react';
import { useLocation } from "react-router";
import PageHeader from "../../components/PageHeader/PageHeader";
import useStdRs from '../../hooks/useStdRs';



const LoadStds = () => {
    const location = useLocation();
    const courseInfo = location.state;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { resources, updateResource } = useStdRs(`${process.env.REACT_APP_HEROKU_ROOT}/rewards/`)

    const [userRewards, setUserRewards] = useState([]);
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);


    const displayStdRewards = async (std) => {
        setLoading(true)
        setUser(`${std.first_name} ${std.last_name}`);
        const res = await resources(std.id);
        setUserRewards(res);
        setLoading(false)
        onOpen();
    }

    const isLoading = () => {
        return loading && (
            <Box
            position="absolute"
            top="calc(50% - 29px)"
            left="calc(50% - 29px)"
            zIndex="10000"
            bg="whitesmoke"
            padding="5px"
            borderRadius="10px"
            display="flex"
            >
                <Spinner size="xl" />
            </Box>
        )
    }

    const changeReward = async (id , newValue) =>{
        setLoading(true)
        await updateResource(id, newValue)
        setLoading(false)
    }

    return (
        <>
            <Box>
                <Box mb='30'>
                    <PageHeader title={courseInfo.course.code} backURL="/ta" />
                </Box>

                {courseInfo ?
                    <Flex flexDir='column' justifyContent='center' alignItems='center'>
                        {courseInfo.course?.students ?
                            courseInfo.course.students.map(std => {
                                return (
                                    <Button key={std.id}
                                        onClick={() => { displayStdRewards(std) }}
                                        bg="#140A4F"
                                        color="white"
                                        m={"12px 7px 12px 7px"}
                                        maxW="220"
                                        minW="220"
                                        minH="70px"
                                        fontSize="15"
                                    >
                                        {std.first_name} {std.last_name}
                                    </Button>
                                )
                            }) :
                            <Box>
                                No Students Lol
                            </Box>
                        }
                    </Flex>
                    :
                    <Flex justifyContent='center' alignitems='center'>

                        <Spinner size="xl" />
                    </Flex>
                }

                {isLoading()}

            </Box>

            <Modal size="full" isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent color="#140A4F">
                    <ModalHeader>
                        <Text fontSize="l" fontWeight="extrabold">
                            {user}
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {userRewards ?

                            userRewards.map((reward) => {
                                return (
                                    !reward.is_confirmed &&
                                    (<Box key={reward.id}>
                                        <Text>
                                            Reward:
                                        </Text>
                                        <Select isDisabled={loading} key={reward.id} onChange={(e) => {changeReward(reward.id, e.target.value)}}>
                                            <option selected={reward.reward == "Waive Late Assignment Penalty"} value="Waive Late Assignment Penalty">
                                                Waive Late Assignment Penalty
                                            </option>
                                            <option selected={reward.reward == "Waive Late of class penalty"} value="Waive Late of class penalty">
                                                Waive Late of class penalty
                                            </option>
                                            <option selected={reward.reward == "+1 mark on any submission"} value="+1 mark on any submission">
                                                +1 mark on any submission
                                            </option>
                                            <option selected={reward.reward == "Resubmit attempt"} value="Resubmit attempt">Resubmit attempt</option>
                                        </Select>
                                    </Box>)
                                )
                            })

                            : <Text>
                                It seems there is no rewards for the student
                            </Text>



                        }


                        {/* {course.students.map((student) => {
                                return (
                                    <FormControl key={student.id}>
                                        <Checkbox
                                            fontSize="md"
                                            fontWeight="medium"
                                            mt="2"
                                            value={student.id}
                                            name={"names"}
                                        >
                                            {student.first_name} {student.last_name}
                                        </Checkbox>
                                    </FormControl>
                                );
                            })} */}
                    </ModalBody>

                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default LoadStds;