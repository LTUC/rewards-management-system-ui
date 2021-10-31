import { useToast } from '@chakra-ui/toast';
import axios from 'axios';


export default function useStdRs(apiUrl = '') {
  const toast = useToast()

  async function fetchResource(id) {
    try {
      const response = await axios.get(apiUrl, config(id));

      return response.data;
    } catch (error) {
      return undefined;
    }
  }


  async function updateResource(id, newReward) {
    try {
      const url = apiUrl + id
      await axios.patch(url, { reward: newReward });
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

  function config(id) {
    return {
      params: {
        ...(id && { id }),
      },
    };
  }

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
    updateResource,
    deleteResource,
  };
}
