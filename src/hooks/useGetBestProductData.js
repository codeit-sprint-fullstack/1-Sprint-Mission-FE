import { useEffect, useState } from "react";
import getApiData from "../api/getApiData.js";
import imgDefualt from "../images/img_default.png";

const useProductData = (deviceType) => {
  const [bestProductsList, setBestProductsList] = useState([]);
  const [bestProductCount, setBestProductCount] = useState(4);

  useEffect(() => { 
    if (deviceType === "PC") {
      setBestProductCount(4)
    } else if (deviceType === "Tablet") {
      setBestProductCount(3)
    } else if (deviceType === "Mobile") {
      setBestProductCount(2)
    }
  },[deviceType])


  useEffect(() => {
    getApiData(1, bestProductCount, "favorite", "")
      .then((data) => {
        if (data.list.length < bestProductCount) {
          setBestProductsList([
            ...data.list,
            ...Array(bestProductCount - data.list.length).fill({
              images: [imgDefualt],
              name: "",
              description: "",
              price: 0,
              favoriteCount: 0,
            }),
          ]);
        } else {
          setBestProductsList(data.list);
        }
      })
      .catch((error) => console.error(error));
  }, [bestProductCount]);

  return bestProductsList;
};
export default useProductData;
