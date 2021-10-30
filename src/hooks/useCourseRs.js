import { useToast } from '@chakra-ui/toast';
import axios from 'axios';



export default function useCourseRs(apiUrl = '') {
  const toast = useToast()

  async function fetchResource() {


    try {
      const response = await axios.get(apiUrl);

      return response.data;
    } catch (error) {
      handleError(error);
    }
  }

  async function createResource(info) {
    try {

      const result = await axios.post(apiUrl, info);
      return result
    } catch (error) {
      handleError(error);
    }
  }


  async function updateResource(id, info) {
    try {
      const url = apiUrl + id
      await axios.patch(url, info);
    } catch (error) {
      handleError(error);
    }
  }

  async function deleteResource(id) {

    try {
      const url = apiUrl + id;
      await axios.delete(url);

    } catch (error) {
      handleError(error);
    }
  }

  // helper function to handle getting Authorization headers EXACTLY right
  //   function config(status = false, page: any = false, status_id: any = false) {
  //     return {
  //       headers: {
  //         Authorization: `Bearer ${ cookies.user.tokens.access }`,
  //         ...(status_id && { 'Content-Type': 'application/json' }),
  //       },
  //       params: {
  //         ...(status && { status }),
  //         ...(page && { page }),
  //       },
  //     };
  //   }

  function handleError(error) {


    toast({
      position: 'bottom',
      title: 'Error',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })




  }

  return {
    resources: fetchResource,
    createResource,
    updateResource,
    deleteResource,
  };
}
