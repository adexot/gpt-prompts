import { Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-muted transition-colors"
            aria-label={copied ? "Copied!" : "Copy to clipboard"}
        >
            {
                copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                )
            }
        </button >
    );
}