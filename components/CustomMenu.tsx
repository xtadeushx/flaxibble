import { Menu } from "@headlessui/react";
import Image from "next/image";

interface FormFieldProps {
  title: string;
  state: string;
  setState: (value: string) => void
  filters: string[]

}

const CustomMenu: React.FC<FormFieldProps> = ({ filters, setState, state, title }) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={title} className='w-full text-gray-100'>
        {title}
      </label>
      <Menu as='div' className='self-start relative'>
        <div className="">
          <Menu.Button className='flexStart custom_menu-btn'>
            {state || 'Select a category'}
            <Image
              src='/arrow-down.svg'
              alt="arrow-down"
              width={10}
              height={5}
            />
          </Menu.Button>
        </div>
        <Menu.Items className='flexStart custom_menu-items'>
          {filters.map((tag) => (
            <Menu.Item key={tag}>
              <button
                type="button"
                value={tag}
                className="custom_menu-item"
                onClick={(e) => setState(e.target.value)}
              >
                {tag}
              </button>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default CustomMenu