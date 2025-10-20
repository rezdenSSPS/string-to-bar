import { BarcodeGenerator } from "@/components/BarcodeGenerator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Barcode Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create professional barcodes instantly. Support for multiple formats including CODE128, EAN13, UPC, and more.
          </p>
        </div>
        
        <BarcodeGenerator />
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Supported formats: CODE128, EAN13, UPC, CODE39, ITF14, MSI, Pharmacode</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
