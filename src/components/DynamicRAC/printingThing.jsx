import { useState, useRef, useCallback } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Textarea } from "./ui/textarea";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  PlusIcon,
  GripVertical,
  CreditCard,
  FileText,
  Receipt,
  Trash2,
  Upload,
  Download,
  Eye,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

function format(date, formatStr) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const pad = (num) => num.toString().padStart(2, "0");

  const formats = {
    yyyy: () => date.getFullYear().toString(),
    yy: () => date.getFullYear().toString().slice(-2),
    MMMM: () => months[date.getMonth()],
    MMM: () => months[date.getMonth()].slice(0, 3),
    MM: () => pad(date.getMonth() + 1),
    M: () => (date.getMonth() + 1).toString(),
    dd: () => pad(date.getDate()),
    d: () => date.getDate().toString(),
    EEEE: () => days[date.getDay()],
    EEE: () => days[date.getDay()].slice(0, 3),
    HH: () => pad(date.getHours()),
    H: () => date.getHours().toString(),
    hh: () => pad(date.getHours() % 12 || 12),
    h: () => (date.getHours() % 12 || 12).toString(),
    mm: () => pad(date.getMinutes()),
    m: () => date.getMinutes().toString(),
    ss: () => pad(date.getSeconds()),
    s: () => date.getSeconds().toString(),
    a: () => (date.getHours() < 12 ? "AM" : "PM"),
  };

  return formatStr.replace(
    /yyyy|yy|MMMM|MMM|MM|M|dd|d|EEEE|EEE|HH|H|hh|h|mm|m|ss|s|a/g,
    (match) => formats[match]()
  );
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const data = [
  { name: "Jan", invoices: 4, quotes: 3 },
  { name: "Feb", invoices: 3, quotes: 1 },
  { name: "Mar", invoices: 2, quotes: 5 },
  { name: "Apr", invoices: 6, quotes: 2 },
  { name: "May", invoices: 8, quotes: 4 },
  { name: "Jun", invoices: 5, quotes: 3 },
];

const pieData = [
  { name: "Invoices", value: 400 },
  { name: "Quotes", value: 300 },
  { name: "Receipts", value: 200 },
  { name: "Estimates", value: 100 },
];

const steps = ["Type", "Template", "Details", "Items", "Preview"];

const currencyOptions = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"];

const fontOptions = [
  "Arial",
  "Helvetica",
  "Times New Roman",
  "Courier",
  "Verdana",
  "Georgia",
];

export default function PrintingThing() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentStep, setCurrentStep] = useState(0);
  const [documentData, setDocumentData] = useState({
    type: "",
    template: "",
    customerName: "",
    customerEmail: "",
    customerAddress: "",
    items: [],
    notes: "",
    terms: "",
    logo: null,
    currency: "USD",
    taxRate: 0,
    discountRate: 0,
    dueDate: "",
    invoiceNumber: `INV-${Math.floor(Math.random() * 1000000)}`,
    primaryColor: "#3B82F6",
    secondaryColor: "#60A5FA",
    font: "Arial",
    fontSize: 12,
  });
  const [newItem, setNewItem] = useState({
    id: uuidv4(),
    description: "",
    quantity: 1,
    price: 0,
  });
  const componentRef = useRef();
  const [showFullPage, setShowFullPage] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDocumentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setDocumentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newItems = Array.from(documentData.items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setDocumentData((prev) => ({ ...prev, items: newItems }));
  };

  const handleItemChange = (id, field, value) => {
    const newItems = documentData.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setDocumentData((prev) => ({ ...prev, items: newItems }));
  };

  const handleAddItem = () => {
    setDocumentData((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    setNewItem({ id: uuidv4(), description: "", quantity: 1, price: 0 });
  };

  const handleRemoveItem = (id) => {
    const newItems = documentData.items.filter((item) => item.id !== id);
    setDocumentData((prev) => ({ ...prev, items: newItems }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDocumentData((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const subtotal = documentData.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const taxAmount = subtotal * (documentData.taxRate / 100);
  const discountAmount = subtotal * (documentData.discountRate / 100);
  const total = subtotal + taxAmount - discountAmount;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: documentData.currency,
    }).format(amount);
  };

  const generatePDF = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
    const blob = pdf.output("blob");
    setPdfBlob(blob);
  };

  const handlePreviewPDF = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      window.open(url, "_blank");
    }
  };

  const handleDownloadPDF = () => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${documentData.type}_${documentData.invoiceNumber}.pdf`;
      link.click();
    }
  };

  const DocumentPreview = useCallback(
    () => (
      <div
        className={`bg-white ${
          showFullPage ? "fixed inset-0 z-50 overflow-auto" : ""
        }`}
        style={{
          fontFamily: documentData.font,
          fontSize: `${documentData.fontSize}px`,
        }}
      >
        <div className="max-w-4xl mx-auto p-8" ref={componentRef}>
          <div className="flex justify-between items-start mb-8">
            <div>
              {documentData.logo && (
                <img
                  src={documentData.logo}
                  alt="Company Logo"
                  className="h-16 mb-4"
                />
              )}
              <h1
                className="text-3xl font-bold"
                style={{ color: documentData.primaryColor }}
              >
                {documentData.type.charAt(0).toUpperCase() +
                  documentData.type.slice(1)}
              </h1>
              <p>{documentData.invoiceNumber}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">
                Date: {format(new Date(), "MMMM dd, yyyy")}
              </p>
              <p>Due Date: {documentData.dueDate}</p>
            </div>
          </div>
          <div className="flex justify-between mb-8">
            <div>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: documentData.secondaryColor }}
              >
                From:
              </h2>
              <p>Your Company Name</p>
              <p>Your Address</p>
              <p>Your City, State ZIP</p>
            </div>
            <div>
              <h2
                className="text-xl font-semibold mb-2"
                style={{ color: documentData.secondaryColor }}
              >
                To:
              </h2>
              <p>{documentData.customerName}</p>
              <p>{documentData.customerEmail}</p>
              <p>{documentData.customerAddress}</p>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow
                style={{
                  backgroundColor: documentData.primaryColor,
                  color: "white",
                }}
              >
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentData.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.quantity * item.price)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 flex justify-end">
            <div className="w-1/2">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax ({documentData.taxRate}%):</span>
                <span>{formatCurrency(taxAmount)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Discount ({documentData.discountRate}%):</span>
                <span>{formatCurrency(discountAmount)}</span>
              </div>
              <div
                className="flex justify-between font-bold text-lg"
                style={{ color: documentData.primaryColor }}
              >
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
          {documentData.notes && (
            <div className="mt-8">
              <h3
                className="font-semibold"
                style={{ color: documentData.secondaryColor }}
              >
                Notes:
              </h3>
              <p>{documentData.notes}</p>
            </div>
          )}
          {documentData.terms && (
            <div className="mt-8">
              <h3
                className="font-semibold"
                style={{ color: documentData.secondaryColor }}
              >
                Terms and Conditions:
              </h3>
              <p>{documentData.terms}</p>
            </div>
          )}
        </div>
      </div>
    ),
    [
      documentData,
      showFullPage,
      subtotal,
      taxAmount,
      discountAmount,
      total,
      formatCurrency,
    ]
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">PrintingThing</h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="create">Create Document</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">46</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">12</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold">$12,450</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Document Creation Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="invoices" fill="#8884d8" />
                    <Bar dataKey="quotes" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Document Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Create New Document</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={steps[currentStep]} className="w-full mb-8">
                <TabsList className="grid w-full grid-cols-5">
                  {steps.map((step, index) => (
                    <TabsTrigger
                      key={step}
                      value={step}
                      disabled={index !== currentStep}
                    >
                      {step}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              {currentStep === 0 && (
                <div className="space-y-4">
                  <Label htmlFor="documentType">Document Type</Label>
                  <Select
                    name="type"
                    value={documentData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invoice">
                        <div className="flex items-center">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Invoice
                        </div>
                      </SelectItem>
                      <SelectItem value="quote">
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Quote
                        </div>
                      </SelectItem>
                      <SelectItem value="receipt">
                        <div className="flex items-center">
                          <Receipt className="mr-2 h-4 w-4" />
                          Receipt
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <Label htmlFor="template">Template</Label>
                  <Select
                    name="template"
                    value={documentData.template}
                    onValueChange={(value) =>
                      handleSelectChange("template", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Modern</SelectItem>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                    </SelectContent>
                  </Select>
                  <div>
                    <Label htmlFor="logo">Upload Logo</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <Input
                      id="primaryColor"
                      name="primaryColor"
                      type="color"
                      value={documentData.primaryColor}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <Input
                      id="secondaryColor"
                      name="secondaryColor"
                      type="color"
                      value={documentData.secondaryColor}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="font">Font</Label>
                    <Select
                      name="font"
                      value={documentData.font}
                      onValueChange={(value) =>
                        handleSelectChange("font", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a font" />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font} value={font}>
                            {font}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="fontSize">
                      Font Size: {documentData.fontSize}px
                    </Label>
                    <Slider
                      id="fontSize"
                      min={8}
                      max={24}
                      step={1}
                      value={[documentData.fontSize]}
                      onValueChange={(value) =>
                        handleSelectChange("fontSize", value[0])
                      }
                    />
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="customerName">Customer Name</Label>
                    <Input
                      id="customerName"
                      name="customerName"
                      value={documentData.customerName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerEmail">Customer Email</Label>
                    <Input
                      id="customerEmail"
                      name="customerEmail"
                      type="email"
                      value={documentData.customerEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerAddress">Customer Address</Label>
                    <Textarea
                      id="customerAddress"
                      name="customerAddress"
                      value={documentData.customerAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      name="invoiceNumber"
                      value={documentData.invoiceNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={documentData.dueDate}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      name="currency"
                      value={documentData.currency}
                      onValueChange={(value) =>
                        handleSelectChange("currency", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {currencyOptions.map((currency) => (
                          <SelectItem key={currency} value={currency}>
                            {currency}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div>
                  <Label>Items</Label>
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="items">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {documentData.items.map((item, index) => (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className="flex items-center space-x-2 mb-2"
                                >
                                  <div {...provided.dragHandleProps}>
                                    <GripVertical className="text-gray-400" />
                                  </div>
                                  <Input
                                    placeholder="Description"
                                    value={item.description}
                                    onChange={(e) =>
                                      handleItemChange(
                                        item.id,
                                        "description",
                                        e.target.value
                                      )
                                    }
                                  />
                                  <Input
                                    type="number"
                                    placeholder="Quantity"
                                    value={item.quantity}
                                    onChange={(e) =>
                                      handleItemChange(
                                        item.id,
                                        "quantity",
                                        parseInt(e.target.value)
                                      )
                                    }
                                    className="w-24"
                                  />
                                  <Input
                                    type="number"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) =>
                                      handleItemChange(
                                        item.id,
                                        "price",
                                        parseFloat(e.target.value)
                                      )
                                    }
                                    className="w-24"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveItem(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                  <div className="flex items-center space-x-2 mt-4">
                    <Input
                      placeholder="Description"
                      value={newItem.description}
                      onChange={(e) =>
                        setNewItem({ ...newItem, description: e.target.value })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      className="w-24"
                    />
                    <Input
                      type="number"
                      placeholder="Price"
                      value={newItem.price}
                      onChange={(e) =>
                        setNewItem({
                          ...newItem,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-24"
                    />
                    <Button onClick={handleAddItem}>
                      <PlusIcon className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input
                        id="taxRate"
                        name="taxRate"
                        type="number"
                        value={documentData.taxRate}
                        onChange={handleInputChange}
                        className="w-24"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="discountRate">Discount Rate (%)</Label>
                      <Input
                        id="discountRate"
                        name="discountRate"
                        type="number"
                        value={documentData.discountRate}
                        onChange={handleInputChange}
                        className="w-24"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={documentData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="terms">Terms and Conditions</Label>
                    <Textarea
                      id="terms"
                      name="terms"
                      value={documentData.terms}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              {currentStep === 4 && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Document Preview</h2>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="fullPage">Full Page View</Label>
                      <Switch
                        id="fullPage"
                        checked={showFullPage}
                        onCheckedChange={setShowFullPage}
                      />
                    </div>
                  </div>
                  <DocumentPreview />
                  <div className="mt-4 flex space-x-2">
                    <Button onClick={generatePDF}>Generate PDF</Button>
                    <Button onClick={handlePreviewPDF} disabled={!pdfBlob}>
                      <Eye className="w-4 h-4 mr-2" /> Preview PDF
                    </Button>
                    <Button onClick={handleDownloadPDF} disabled={!pdfBlob}>
                      <Download className="w-4 h-4 mr-2" /> Download PDF
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handlePrev} disabled={currentStep === 0}>
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
              >
                {currentStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
