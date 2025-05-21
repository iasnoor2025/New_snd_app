import React from 'react';
import { Download, Trash, FileText, Image, FileCode, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MediaItemProps {
    item: {
        id: number;
        file_name: string;
        mime_type: string;
        size: number;
        created_at: string;
    };
    onDelete: (id: number) => void;
    onDownload: (id: number) => void;
}

const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) {
        return <Image className="h-8 w-8 text-blue-500" />
    }
    if (mimeType.startsWith('text/')) {
        return <FileCode className="h-8 w-8 text-green-500" />
    }
    if (mimeType.includes('spreadsheet') || mimeType.includes('excel')) {
        return <FileSpreadsheet className="h-8 w-8 text-emerald-500" />
    }
    return <FileText className="h-8 w-8 text-gray-500" />
};

const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const MediaItem: React.FC<MediaItemProps> = ({ item, onDelete, onDownload }) => {
    return (
        <Card className="hover:border-blue-300 transition-colors">
            <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        {getFileIcon(item.mime_type)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                            {item.file_name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {formatFileSize(item.size)} • {new Date(item.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex justify-end space-x-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDownload(item.id)}
                                    className="h-8 w-8"
                                    <Download className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Download</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => onDelete(item.id)}
                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Delete</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </CardContent>
        </Card>
    );
};
