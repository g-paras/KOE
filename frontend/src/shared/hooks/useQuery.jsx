import { useQuery as useReactQuery } from "react-query";

const useQuery = (props) => {
    const { actionType, ...rest } = props;

    const queryClient = useReactQuery();
};

export default useQuery;