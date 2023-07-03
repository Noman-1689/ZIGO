'use client';

import { usePathname, useSearchParams } from 'next/navigation';

import { GiBarn, GiFactory, GiForestCamp, GiModernCity,} from 'react-icons/gi';
import { FaRegBuilding } from 'react-icons/fa';
import { BsHouseUp, BsHouseDown, BsSnow, BsFillBuildingsFill, BsFillBuildingFill } from 'react-icons/bs';
import { IoHomeSharp } from 'react-icons/io5';
import { MdFactory, MdWarehouse } from 'react-icons/md';
import {HiHomeModern} from 'react-icons/hi2';
import {ImOffice} from 'react-icons/im'

import CategoryBox from "../CategoryBox";
import Container from '../Container';
import { AiFillShop } from 'react-icons/ai';
import { TbHomeCheck, TbHomeDollar } from 'react-icons/tb';

export const purposes = [
  {
    label: 'Sell',
    icon: TbHomeCheck,
  },

  {
    label: 'Rent',
    icon: TbHomeDollar,
  },
]

export const buyPurposes = [
  {
    label: 'Buy',
    icon: TbHomeCheck,
  },

  {
    label: 'Rent',
    icon: TbHomeDollar,
  },
]

export const types = [
  {
    label: 'House',
    icon: IoHomeSharp,
    description: 'This property is a house',
  },
  {
    label: 'Flat',
    icon: FaRegBuilding,
    description: 'This property is a flat',
  },
  {
    label: 'Upper Portion',
    icon: BsHouseUp,
    description: 'This property has upper portion'
  },
  {
    label: 'Lower Protion',
    icon: BsHouseDown,
    description: 'This property has lower portion'
  },
  {
    label: 'Farmhouse',
    icon: GiBarn,
    description: 'This is property has a farmhouse'
  },
  {
    label: 'Penthouse',
    icon: BsFillBuildingsFill,
    description: 'This property has a penthouse'
  },
  {
    label: 'Residential Plot',
    icon: HiHomeModern,
    description: 'This property is a residential plot'
  },
  {
    label: 'Commercial Plot',
    icon: GiModernCity,
    description: 'This property is a commercial plot'
  },
  {
    label: 'Agricultural Land',
    icon: GiForestCamp,
    description: 'This property is a agricultural land'
  },
  {
    label: 'Industrial Land',
    icon: MdFactory,
    description: 'This property is a industrial land'
  },
  {
    label: 'Office',
    icon: ImOffice,
    description: 'This property is a office'
  },
  {
    label: 'Shop',
    icon: AiFillShop,
    description: 'This property is a shop'
  },
  {
    label: 'Building',
    icon: BsFillBuildingFill,
    description: 'This property has building'
  },
  {
    label: 'Warehouse',
    icon: MdWarehouse,
    description: 'This property is has a warehouse'
  },
  {
    label: 'Factory',
    icon: GiFactory,
    description: 'This property has factory'
  }
]

const Categories = () => {
  const params = useSearchParams();
  const type = params?.get('type');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
  <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto
      scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300 
      ">
        <div className="flex flex-nowrap space-x-4">
          {types.map((item) => (
            <CategoryBox 
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={type === item.label}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
 
export default Categories;