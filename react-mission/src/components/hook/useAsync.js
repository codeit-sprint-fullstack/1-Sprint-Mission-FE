import { useCallback, useState } from "react";

function useAsync (asyncFunc) {
    const [lodingError, setLodingError] = useState(null);
    const [lodingErrorTag, setLodingErrorTag] = useState(false);

    // api 함수 호출
    const wrappedFunction = useCallback( async (...agrs) => {
        try {
            setLodingError(null);
            setLodingErrorTag(false);
            return await asyncFunc(...agrs);
        } catch (e) {
            setLodingError(e);
            setLodingErrorTag(true);
            return;
        }
    }, [asyncFunc]);
    
    return [lodingError, lodingErrorTag, wrappedFunction]
}

export default useAsync