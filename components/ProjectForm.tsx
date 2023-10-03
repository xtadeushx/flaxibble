"use client";

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import { useState } from "react";

interface ProjectFormProps {
  type: 'create' | 'edit';
  session: SessionInterface
}

const ProjectForm: React.FC<ProjectFormProps> = ({ session, type }) => {
  const [isSubmitting, setSsSubmitting] = useState(false)
  const [form, setForm] = useState({
    image: '',
    title: '',
    description: '',
    liveSiteUrl: '',
    gitHubUrl: '',
    category: ''
  });

  const handleFormSubmit = (e: React.FormEvent) => {
  }
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  }

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value
    }))
  };

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flexStart form"
    >
      <div className="flexStart flex_image_container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          type="file"
          id='image'
          accept="image/*"
          required={type === 'create'}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {!form.image &&
          <Image
            alt="Project poster"
            src={form?.image}
            fill
            className="sm:p-10 object-contain z-20"
          />
        }
      </div>
      <FormField
        title='Title'
        state={form.title}
        placeholder='Flexibble'
        setState={(value) => handleStateChange('title', value)}
      />
      <FormField
        title='Description'
        state={form.description}
        placeholder='Showcase and discover remarkable developer projects.'
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type='url'
        title='Website URL'
        state={form.liveSiteUrl}
        placeholder='https://jsmastey.projects'
        setState={(value) => handleStateChange('liveSiteUrl', value)}
      />
      <FormField
        type='url'
        title='GitHub URL'
        state={form.gitHubUrl}
        placeholder='https://github.com/adrianhajdin/project_nextjs13'
        setState={(value) => handleStateChange('gitHubUrl', value)}
      />
      <CustomMenu
        title='Category'
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <button>Create</button>
      </div>
    </form>
  )
}

export default ProjectForm;