import { useState, useRef, useEffect } from "react";
import JsBarcode from "jsbarcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export const BarcodeGenerator = () => {
  const [barcodeText, setBarcodeText] = useState("123456789012");
  const [format, setFormat] = useState("CODE128");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    generateBarcode();
  }, [barcodeText, format]);

  const generateBarcode = () => {
    if (!canvasRef.current || !barcodeText) return;

    try {
      JsBarcode(canvasRef.current, barcodeText, {
        format: format,
        width: 2,
        height: 100,
        displayValue: true,
        fontSize: 14,
        margin: 10,
      });
    } catch (error) {
      toast.error("Invalid barcode format for this text");
    }
  };

  const handleDownload = () => {
    if (!canvasRef.current || !downloadLinkRef.current) return;

    const dataURL = canvasRef.current.toDataURL("image/png");
    downloadLinkRef.current.href = dataURL;
    downloadLinkRef.current.download = `barcode-${barcodeText}.png`;
    downloadLinkRef.current.click();
    toast.success("Barcode downloaded!");
  };

  const handleCopy = async () => {
    if (!canvasRef.current) return;

    try {
      const dataURL = canvasRef.current.toDataURL("image/png");
      const blob = await (await fetch(dataURL)).blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      toast.success("Barcode copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy barcode");
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Barcode Generator</CardTitle>
        <CardDescription>
          Enter your text and select a format to generate a barcode
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="barcode-text">Barcode Text</Label>
            <Input
              id="barcode-text"
              type="text"
              placeholder="Enter text to encode"
              value={barcodeText}
              onChange={(e) => setBarcodeText(e.target.value)}
              className="text-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="barcode-format">Barcode Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger id="barcode-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CODE128">CODE128</SelectItem>
                <SelectItem value="EAN13">EAN13</SelectItem>
                <SelectItem value="UPC">UPC</SelectItem>
                <SelectItem value="CODE39">CODE39</SelectItem>
                <SelectItem value="ITF14">ITF14</SelectItem>
                <SelectItem value="MSI">MSI</SelectItem>
                <SelectItem value="pharmacode">Pharmacode</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-background rounded-lg border-2 border-dashed border-border">
          <canvas ref={canvasRef} className="max-w-full"></canvas>
        </div>

        <div className="flex gap-3">
          <Button onClick={handleDownload} className="flex-1">
            <Download className="mr-2 h-4 w-4" />
            Download PNG
          </Button>
          <Button onClick={handleCopy} variant="outline" className="flex-1">
            {copied ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Image
              </>
            )}
          </Button>
        </div>

        <a ref={downloadLinkRef} className="hidden" />
      </CardContent>
    </Card>
  );
};
