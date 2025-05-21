import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { ToastService } from '@/components/shared/ToastManager';
import { cn } from '@/lib/utils';

// Import Tabs from Components with capital C to fix casing issue
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/Components/ui/tabs';

export function ShadcnDemo() {
  const [name, setName] = useState<string>('');

  const handleButtonClick = () => {
    // Use simple string for ToastService.success since it expects a string
    ToastService.success('You clicked the button!');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Use simple string for ToastService.success since it expects a string
    ToastService.success(`Form submitted! Hello, ${name || 'Guest'}!`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shadcn UI Components Demo</h1>

      <Tabs defaultValue="components" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="form">Form</TabsTrigger>
        </TabsList>

        <TabsContent value="components">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Button Card */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons</CardTitle>
                <CardDescription>Various button styles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Button onClick={handleButtonClick}>Default Button</Button>
                </div>
                <div>
                  <Button variant="outline" onClick={handleButtonClick}>Outline Button</Button>
                </div>
                <div>
                  <Button variant="destructive" onClick={handleButtonClick}>Destructive Button</Button>
                </div>
                <div>
                  <Button variant="ghost" onClick={handleButtonClick}>Ghost Button</Button>
                </div>
                <div>
                  <Button variant="secondary" onClick={handleButtonClick}>Secondary Button</Button>
                </div>
              </CardContent>
            </Card>

            {/* Dialog Card */}
            <Card>
              <CardHeader>
                <CardTitle>Dialog</CardTitle>
                <CardDescription>Modal dialog component</CardDescription>
              </CardHeader>
              <CardContent>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open Dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dialog Title</DialogTitle>
                      <DialogDescription>
                        This is a dialog component from Shadcn UI.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                      <p>
                        Dialog content goes here. You can put any content inside this dialog.
                      </p>
                    </div>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button>Continue</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Card Example */}
            <Card>
              <CardHeader className={cn("bg-primary/5 rounded-t-lg")}>
                <CardTitle>Card Component</CardTitle>
                <CardDescription>A versatile card component</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p>Cards can be used for various UI elements like:</p>
                <ul className="list-disc list-inside mt-2">
                  <li>Product displays</li>
                  <li>User profiles</li>
                  <li>Feature highlights</li>
                  <li>Content containers</li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button variant="ghost">Cancel</Button>
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Form Example</CardTitle>
              <CardDescription>A demo form using Shadcn UI components</CardDescription>
            </CardHeader>
            <form onSubmit={handleFormSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Type your message here..."
                    rows={4}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Submit Form</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}