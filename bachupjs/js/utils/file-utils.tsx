import { FileText, Image, FileArchive, FileCode, FileSpreadsheet } from 'lucide-react';
import React from 'react';

/**
 * Get an appropriate icon component for a given file type
 * @param fileType The MIME type or file extension of the file
 * @param size Optional size in pixels for the icon (defaults to 18)
 * @returns React component for the file icon
 */
export const getFileIcon = (fileType: string, size: number = 18): React.ReactNode => {
    const iconProps = { width: size, height: size };

    // Handle by MIME type
    if (fileType.includes('image')) {
        return <Image {...iconProps} className="text-blue-500" />
    }

    if (fileType.includes('pdf')) {
        return <FileText {...iconProps} className="text-red-500" />
    }

    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('tar') || fileType.includes('archive')) {
        return <FileArchive {...iconProps} className="text-yellow-500" />
    }

    if (fileType.includes('excel') || fileType.includes('spreadsheet') || fileType.includes('csv') || fileType.includes('xls')) {
        return <FileSpreadsheet {...iconProps} className="text-green-500" />
    }

    if (fileType.includes('html') || fileType.includes('javascript') || fileType.includes('css') || fileType.includes('json')) {
        return <FileCode {...iconProps} className="text-purple-500" />
    }

    // Default icon
    return <FileText {...iconProps} className="text-gray-500" />
};
