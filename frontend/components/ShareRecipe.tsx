"use client";
import { Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createRecipe } from "@/lib/api/community";
import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function ShareRecipe() {
  const { getToken } = useAuth();

  const [data, setData] = useState({
    title: "",
    description: "",
    ingrediants: "",
    steps: "",
  });

  const handleOnChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
    console.log("ingrediant:",data.steps)
  };

  const sendData = async () => {
    const token: string | null = await getToken();
    const dataToSend = {
      title: data.title,
      description: data.description,
      ingredients: data.ingrediants.split(",").map(i => i.trim()),
      steps: data.steps.split(",")
      .map(s => s.trim()).filter(Boolean),
    }
    try {
      const res = await createRecipe(dataToSend, token!);
      // console.log("res from the community:", res);
      
      if(res){
        toast.success("Post created")
        setData({
          title: "",
          description: "",
          ingrediants: "",
          steps: "",
        })
      }
    } catch (err: any) {
      toast.error(err ? err.message : "Error in creating post")
      console.log(err);
    }
  };

  return (
    <div className="bg-linear-to-br from-purple-600 to-purple-700 text-white rounded-2xl p-5 mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
        <h2 className="font-semibold text-lg">Share & Discover</h2>
      </div>
      <p className="text-purple-100 text-sm mb-4">
        Join our community of food waste warriors. Share your recipes and learn
        from others!
      </p>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-full">
            <Plus className="w-4 h-4 mr-2" />
            Share your recipe
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share your recipe</DialogTitle>
            <DialogDescription>
              Share the details of what you made today.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={data.title}
                onChange={handleOnChange}
                placeholder="cake"
              />
            </Field>
            <Field>
              <Label htmlFor="desc">Description</Label>
              <Input
                id="description"
                name="description"
                value={data.description}
                onChange={handleOnChange}
                placeholder="how it tastes..."
              />
            </Field>
            <Field>
              <Label htmlFor="ingrediants">Ingrediants</Label>
              <Input
                id="ingrediants"
                name="ingrediants"
                value={data.ingrediants}
                onChange={handleOnChange}
                placeholder="milk,bread,chocolate"
              />
            </Field>
            <Field>
              <Label htmlFor="steps">Steps</Label>
              <Textarea
                id="steps"
                name="steps"
                value={data.steps}
                onChange={handleOnChange}
                placeholder="tell us how you made it..."
              />
            </Field>
            <Field>
              <Label htmlFor="image">Image</Label>
              <Input id="image" name="image" type="file" />
            </Field>
          </FieldGroup>
          <Button onClick={sendData}>Share</Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
