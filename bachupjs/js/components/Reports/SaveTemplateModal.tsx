import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

interface SaveTemplateModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (name: string, description: string, isPublic: boolean) => void;
}

const SaveTemplateModal: React.FC<SaveTemplateModalProps> = ({
    open,
    onOpenChange,
    onSave
}) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSubmit = async () => {
        if (!name) return;

        setIsLoading(true);
        try {
            await onSave(name, description, isPublic);
            setName('');
            setDescription('');
            setIsPublic(false);
            onOpenChange(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Save as Template</DialogTitle>
                    <DialogDescription>
                        Save your current report configuration as a template for future use
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            placeholder="Template name"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                            placeholder="Template description"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <div></div>
                        <div className="col-span-3 flex items-center space-x-2">
                            <Checkbox
                                id="public"
                                checked={isPublic}
                                onCheckedChange={(checked) => setIsPublic(checked === true)}
                            />
                            <Label htmlFor="public">Make this template available to all users</Label>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={!name || isLoading}
                        {isLoading ? 'Saving...' : 'Save Template'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default SaveTemplateModal;
