import React, { useEffect, useState } from "react";
import Main from '../../components/Categories/MainCategory';
import { create, remove, search, update } from '../../services/category';

export default function Category({ setTitle }) {
  useEffect(() => { setTitle('Draco - Nhãn Lớn'); }, [setTitle]);

  const [optionSearch, setOptionSearch] = useState({
    category_name: '',
  });
  const [data, setData] = useState();
  

  // Get data
  useEffect(() => {
    searchData(optionSearch)
  }, [optionSearch]);

  const searchData = (option) => {
    search(option).then((res) => setData(res)).catch((err) => console.log(err.message));
  }

  const handlePost = (option, action) => {
    if (option)
    {
      switch (action) {
        case 0:
          return create(option);
          // break;
        case 1:
          return update(option);
          // break;
        case 2:
          return remove(option);
          // break;
        default:
          break;
      }
    }
  }

  return (
    <div className='min-h-screen p-4'>
      <Main data={data} setData={setData} optionSearch={optionSearch} searchData={searchData} handlePost={handlePost} setOptionSearch={setOptionSearch} />
    </div>
  );
}
