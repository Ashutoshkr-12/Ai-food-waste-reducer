"use client"
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
import React, { useState } from "react";


export default function ShareRecipe(){
    const [data, setData] = useState({
        title: "",
        desc: "",
        ingrediant:"",
        steps:"",
    })

 const handleOnChange = async(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

const sendData = async () => {
    try {
        const res = await createRecipe(data)
        console.log("res from the community:",res)
    } catch (error) {
    }
}

    

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
      <Button className="bg-white text-purple-600 hover:bg-purple-50 rounded-full">
        <Plus className="w-4 h-4 mr-2" />
        <Dialog>
          <DialogTrigger>Share your recipe</DialogTrigger>
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
                <Input id="title" name="title" onChange={handleOnChange} placeholder="cake" />
              </Field>
              <Field>
                <Label htmlFor="desc">Description</Label>
                <Input id="desc" name="desc" onChange={handleOnChange} placeholder="how it tastes..." />
              </Field>
              <Field>
                <Label htmlFor="ingrediants">Ingrediants</Label>
                <Input
                  id="ingrediants"
                  name="ingrediants"
                  onChange={handleOnChange}
                  placeholder="milk,bread,chocolate"
                />
              </Field>
              <Field>
                <Label htmlFor="steps">Steps</Label>
                <Textarea id="steps" onChange={handleOnChange} placeholder="tell us how you make it..." />
              </Field>
              <Field>
                <Label htmlFor="image">Image</Label>
                <Input id="image" name="image" type="file" />
              </Field>
            </FieldGroup>
          </DialogContent>
        </Dialog>
      </Button>
    </div>
  );
};
