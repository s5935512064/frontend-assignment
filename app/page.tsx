"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

interface Item {
  type: string;
  name: string;
}

const data = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

export default function Home() {
  const [products, setProducts] = useState<Array<Item>>(data);
  const [productSelect, setProductSelect] = useState<Array<Item>>([]);
  const [notFound, setNotFound] = useState<string>("");
  const [inputValue, setInputValue] = useState<
    string | number | readonly string[] | undefined
  >();

  const [totalData, setTotalData] = useState<number>(0);
  const [users, setUsers] = useState<Users>([]);
  const [usersGroup, setUsersGroup] = useState<any>([]);

  function removeAndBackdata(selectItem: Item) {
    setTimeout(() => {
      setProductSelect((currentProducts) =>
        currentProducts.filter((p) => p !== selectItem)
      );
      setProducts((oldProduct) => [...oldProduct, selectItem]);
    }, 5000);
  }

  function filterProduct() {
    const found = products.find(
      (p) => p.name.toLowerCase() === String(inputValue).toLowerCase()
    );

    if (found) {
      setNotFound("");
      setProducts((currentProducts) =>
        currentProducts.filter((p) => p !== found)
      );
      setProductSelect((prevProducts) => [...prevProducts, found]);
      removeAndBackdata(found);
    } else {
      setNotFound("Not found product.");
    }
  }

  function groupBy(objectArray: any, property: string, subProperty?: string) {
    return objectArray.reduce(function (acc: any, obj: any) {
      if (subProperty) {
        var key = obj[property][subProperty];
      } else {
        var key = obj[property];
      }
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  function findingMode(age: any) {
    age = age.slice().sort((x: any, y: any) => x - y);

    var bestStreak = 1;
    var bestElem = age[0];
    var currentStreak = 1;
    var currentElem = age[0];

    for (let i = 1; i < age.length; i++) {
      if (age[i - 1] !== age[i]) {
        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
          bestElem = currentElem;
        }

        currentStreak = 0;
        currentElem = age[i];
      }

      currentStreak++;
    }

    return currentStreak > bestStreak ? currentElem : bestElem;
  }

  function summaryBy(objectArray: Users, objProp: any) {
    const maleCount = objectArray.filter(
      (p) => p.gender.toLowerCase() === "male"
    ).length;
    const femaleCount = objectArray.filter(
      (p) => p.gender.toLowerCase() === "female"
    ).length;

    const max = objectArray.reduce(function (prev, current) {
      return prev && prev.age > current.age ? prev : current;
    });

    const min = objectArray.reduce(function (prev, current) {
      return prev && prev.age < current.age ? prev : current;
    });

    const initialAge: number[] = [];
    objectArray.map((item) => initialAge.push(item.age));
    const modeAge = findingMode(initialAge);

    const hairGroup = groupBy(objectArray, "hair", "color");
    const hairObj = Object.keys(hairGroup).reduce(function (
      acc: any,
      obj: any
    ) {
      var key = obj;
      if (!acc[key]) {
        acc[key] = hairGroup[obj].length;
      }
      return acc;
    },
    {});

    // var total = 0;
    // for (var i = 0; i < objectArray.length; i++) {
    //   total += objectArray[i].age;
    // }
    // var avg = total / objectArray.length;

    let dataSummary = {
      male: maleCount,
      female: femaleCount,
      ageRange: `${min.age}-${max.age}`,
      ageMode: modeAge,
      hair: hairObj,
    };

    console.log(dataSummary);
  }

  function groupUsers() {
    let temp = groupBy(users, "company", "department");
    // let summary = Object.keys(temp).map((item) => {
    //     return summaryBy(item)
    // });

    Object.keys(temp).map((item) => {
      summaryBy(temp[item], item);
    });

    // console.log(temp);
    // setUsersGroup(temp);
  }

  async function paginationData() {
    try {
      const response = await axios.get(
        `https://dummyjson.com/users?skip=${users.length}`
      );

      if (response.status == 200) {
        let temp = users.concat(response.data.users);
        setUsers(temp);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchData() {
    try {
      const response = await axios.get("https://dummyjson.com/users");

      if (response.status == 200) {
        setTotalData(response.data.total);
        setUsers(response.data.users);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (totalData > users?.length) {
      paginationData();
    }
  }, [users]);

  useEffect(() => {
    console.log(usersGroup);
  }, [usersGroup]);

  return (
    <main className="min-h-screen w-full flex flex-col justify-center  px-5 md:px-10 xl:px-0 py-10 bg-slate-50">
      <div className="max-w-[1440px] w-full md:min-h-[80vh] h-full grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="w-full p-4 flex flex-wrap  md:flex-col gap-2 h-fit">
          {products ? (
            products.map((item, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInputValue(item.name)}
                className="bg-white rounded-md shadow px-4 py-2 text-center text-black focus:shadow-md w-fit md:w-full h-fit"
              >
                {item.name}
              </button>
            ))
          ) : (
            <p>ไม่มีรายการ</p>
          )}
        </div>

        <div className="w-full p-4 flex flex-col gap-2 md:col-span-4">
          <div className="w-full h-fit flex items-end  gap-2  ">
            <label
              htmlFor="product"
              className=" flex flex-col w-full flex-1 gap-1"
            >
              Select Product
              <input
                type="text"
                onChange={(event) => setInputValue(event.target.value)}
                value={inputValue}
                className="w-full h-fit border rounded-md px-4 py-2 outline-none "
              />
            </label>

            <button
              type="button"
              onClick={filterProduct}
              className="w-fit h-fit rounded-md drop-shadow px-4 py-2 text-center shrink-0 min-w-[120px] bg-blue-500 text-white hover:brightness-105 duration-200 -translate-y-[2px]"
            >
              ENTER
            </button>
          </div>

          {notFound != "" ? <p className="text-red-400">{notFound}</p> : null}

          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="w-full h-full border shadow bg-white flex flex-col rounded-md overflow-hidden">
              <div className="w-full text-center bg-red-400 px-4 py-2 flex items-center justify-center gap-2">
                <p className="text-white">Fruits</p>
                <div className="w-6 h-6 relative">
                  <Image
                    src={"/assets/fruit_3194591.svg"}
                    alt="fruit"
                    sizes="100vw"
                    width="0"
                    height="0"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="p-4 w-full flex flex-col gap-2">
                {productSelect &&
                  productSelect
                    .filter((p) => p.type === "Fruit")
                    .map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className="bg-white rounded-md shadow-sm px-4 py-2 text-center text-black focus:shadow-md border w-full"
                      >
                        {item.name}
                      </button>
                    ))}
              </div>
            </div>

            <div className="w-full h-full border shadow bg-white flex flex-col rounded-md overflow-hidden">
              <div className="w-full text-center bg-red-400 px-4 py-2 flex items-center justify-center gap-2">
                <p className="text-white">Vegetables</p>
                <div className="w-6 h-6 relative">
                  <Image
                    src={"/assets/vegetable_2153786.svg"}
                    alt="fruit"
                    sizes="100vw"
                    width="0"
                    height="0"
                    style={{ objectFit: "contain", objectPosition: "center" }}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="p-4 w-full flex flex-col gap-2">
                {productSelect &&
                  productSelect
                    .filter((p) => p.type === "Vegetable")
                    .map((item, index) => (
                      <button
                        key={index}
                        type="button"
                        className="bg-white rounded-md shadow-sm px-4 py-2 text-center text-black focus:shadow-md border w-full"
                      >
                        {item.name}
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] w-full md:min-h-[80vh] h-full  gap-4 bg-white rounded-md border p-5">
        <button
          type="button"
          onClick={groupUsers}
          disabled={totalData != users.length}
          className="w-fit h-fit rounded-md drop-shadow px-4 py-2 text-center shrink-0 min-w-[120px] bg-blue-500 text-white hover:brightness-105 duration-200 -translate-y-[2px] disabled:grayscale"
        >
          {totalData != users.length ? "Fetching.." : "Summary Data"}
        </button>
      </div>
    </main>
  );
}
