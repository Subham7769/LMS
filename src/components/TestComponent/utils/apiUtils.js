import { toast } from "./ui/use-toast";

export const fetchData = async (apiConfig) => {
  if (apiConfig.getUrl) {
    try {
      const response = await fetch(apiConfig.getUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      toast({
        title: "Data Fetched",
        description: "Form data has been loaded from the API.",
      });
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data from the API.",
        variant: "destructive",
      });
    }
  }
};

export const createData = async (formData, apiConfig) => {
  if (apiConfig.postUrl) {
    try {
      const response = await fetch(apiConfig.postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create data");
      }
      const data = await response.json();
      toast({
        title: "Data Created",
        description: "New form data has been created.",
      });
      return data;
    } catch (error) {
      console.error("Error creating data:", error);
      toast({
        title: "Error",
        description: "Failed to create new data.",
        variant: "destructive",
      });
    }
  }
};

export const updateData = async (formData, apiConfig) => {
  if (apiConfig.putUrl) {
    try {
      const response = await fetch(apiConfig.putUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update data");
      }
      const data = await response.json();
      toast({
        title: "Data Updated",
        description: "Form data has been updated.",
      });
      return data;
    } catch (error) {
      console.error("Error updating data:", error);
      toast({
        title: "Error",
        description: "Failed to update data.",
        variant: "destructive",
      });
    }
  }
};

export const deleteData = async (id, apiConfig) => {
  if (apiConfig.deleteUrl) {
    try {
      const response = await fetch(`${apiConfig.deleteUrl}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete data");
      }
      toast({
        title: "Data Deleted",
        description: "Form data has been deleted.",
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      toast({
        title: "Error",
        description: "Failed to delete data.",
        variant: "destructive",
      });
    }
  }
};
