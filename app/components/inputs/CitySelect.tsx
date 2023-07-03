
import Select from 'react-select'

import useCities from '@/app/hooks/useCities';

export type CitySelectValue = {

    label: string;
    latlng: number[],
    value: string
  }
  
  interface CitySelectProps {
    value?: CitySelectValue;
    onChange: (value: CitySelectValue) => void;
  }
  
const CitySelect : React.FC<CitySelectProps> = ({
    value,
    onChange

  }) => {
    const { getAll } = useCities();

    return ( 
    <div>
      <Select
        placeholder="Select city"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CitySelectValue)}
        formatOptionLabel={(option: any) => (

          <div className="flex flex-row items-center gap-3">
            <div>
              {option.label},
            </div>
          </div>
        )}

        classNames={{
          control: () => 'p-3 border-2',
          input: () => 'text-md',
          option: () => 'text-md'
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#bfdbfe'
          }
        })}
        styles={{
            // Fixes the overlapping problem of the component
            menu: provided => ({ ...provided, zIndex: 9999 })
          }}
      />
    </div>

     );
}
 
export default CitySelect;