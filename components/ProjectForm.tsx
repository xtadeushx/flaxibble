"use client";

import { SessionInterface } from "@/common.types";
import Image from "next/image";
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";
import { categoryFilters } from "@/constants";
import { useState } from "react";
import Button from "./Button";
import { createNewProject, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface ProjectFormProps {
  type: 'create' | 'edit';
  session: SessionInterface
}

const ProjectForm: React.FC<ProjectFormProps> = ({ session, type }) => {
  const router = useRouter()
  const [isSubmitting, setSsSubmitting] = useState(false)
  const [form, setForm] = useState({
    image: '',
    title: '',
    description: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSsSubmitting(true);

    const { token } = await fetchToken();
    console.log('token', token);
    try {
      if (type === 'create') {
        await createNewProject(form, session?.user?.id, token);

        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSsSubmitting(false)
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      alert('Please upload an image!');

      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result)
    };
  };

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
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          id="image"
          type="file"
          accept='image/*'
          required={type === "create" ? true : false}
          className="form_image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20" alt="image"
            fill
          />
        )}
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
        state={form.githubUrl}
        placeholder='https://github.com/adrianhajdin/project_nextjs13'
        setState={(value) => handleStateChange('githubUrl', value)}
      />
      <CustomMenu
        title='Category'
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className="flexStart w-full">
        <Button
          title={isSubmitting ? `${type === "create" ? "Creating" : "Editing"}` : `${type === "create" ? "Create" : "Edit"}`}
          type='submit'
          leftIcon={isSubmitting ? '' : '/plus.svg'}
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  )
}

export default ProjectForm;