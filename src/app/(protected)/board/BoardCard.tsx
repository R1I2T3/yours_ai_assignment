import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, CheckCircle2, CircleDashed } from "lucide-react";
import { Badge } from "lucide-react";
import BoardCardActions from "./BoardCardActions";

const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 50%)`;
};

interface BoardCardProps {
  id: string;
  name: string;
}
const BoardStatusCard = ({ id, name }: BoardCardProps) => {
  const headerColor = getRandomColor();
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader
        style={{ backgroundColor: headerColor }}
        className="text-white rounded-t-lg"
      >
        <CardTitle className="flex justify-between text-2xl font-bold text-center">
          {name}
          <BoardCardActions id={id} />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 pb-4 px-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <CircleDashed className="text-blue-500" />
            <span className="font-semibold text-gray-700">Todo</span>
          </div>
          <Badge className="text-blue-500 bg-blue-100 px-3 py-1 text-sm font-medium">
            {"todo count"}
          </Badge>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Layers className="text-yellow-500" />
            <span className="font-semibold text-gray-700">In Progress</span>
          </div>
          <Badge className="text-yellow-500 bg-yellow-100 px-3 py-1 text-sm font-medium">
            {"Progress count"}
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="text-green-500" />
            <span className="font-semibold text-gray-700">Finished</span>
          </div>
          <Badge className="text-green-500 bg-green-100 px-3 py-1 text-sm font-medium">
            {"Finished"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default BoardStatusCard;
