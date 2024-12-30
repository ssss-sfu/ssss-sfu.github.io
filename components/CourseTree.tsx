import React from "react";
import ReactFlow, { ReactFlowProvider, Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

const CourseTree: React.FC = () => {
  // Define test nodes directly in the component
  const courseNodes: Node[] = [
    // Lower Division Requirements **

    // Students complete one of
    {
      id: "1",
      type: "output",
      data: { label: "CMPT 105W" },
      position: { x: 0, y: 200 },
    },
    {
      id: "2",
      type: "output",
      data: { label: "ENSC 105W" },
      position: { x: 200, y: 200 },
    },
    {
      id: "3",
      type: "output",
      data: { label: "MSE 101W" },
      position: { x: 400, y: 200 },
    },
    {
      id: "4",
      type: "output",
      data: { label: "SEE 101W" },
      position: { x: 600, y: 200 },
    },
    {
      id: "5",
      type: "output",
      data: { label: "CMPT 130" },
      position: { x: 800, y: 200 },
    },
    {
      id: "6",
      type: "default",
      data: { label: "CMPT 135" },
      position: { x: 700, y: 100 },
    },
    {
      id: "7",
      type: "default",
      data: { label: "CMPT 201" },
      position: { x: 800, y: 0 },
    },
    {
      id: "8",
      type: "default",
      data: { label: "CMPT 210" },
      position: { x: 600, y: 0 },
    },
    {
      id: "9",
      type: "default",
      data: { label: "CMPT 213" },
      position: { x: 1100, y: -100 },
    },
    {
      id: "10",
      type: "default",
      data: { label: "CMPT 225" },
      position: { x: 1000, y: 0 },
    },
    {
      id: "11",
      type: "default",
      data: { label: "CMPT 276" },
      position: { x: 900, y: -100 },
    },
    {
      id: "12",
      type: "default",
      data: { label: "CMPT 295" },
      position: { x: 400, y: 0 },
    },
    {
      id: "13",
      type: "output",
      data: { label: "MACM 101" },
      position: { x: 900, y: 100 },
    },
    {
      id: "14",
      type: "default",
      data: { label: "STAT 271" },
      position: { x: 1300, y: -100 },
    },
    // and one of
    {
      id: "15",
      type: "default",
      data: { label: "MATH 150" },
      position: { x: 400, y: 100 },
    },
    {
      id: "16",
      type: "default",
      data: { label: "MATH 151" },
      position: { x: 400, y: 100 },
    },
    {
      id: "17",
      type: "default",
      data: { label: "MATH 154" },
      position: { x: 400, y: 100 },
    },
    {
      id: "18",
      type: "default",
      data: { label: "MATH 157" },
      position: { x: 400, y: 100 },
    },
    // and one of
    {
      id: "19",
      type: "default",
      data: { label: "MATH 152" },
      position: { x: 400, y: 100 },
    },
    {
      id: "20",
      type: "default",
      data: { label: "MATH 155" },
      position: { x: 400, y: 100 },
    },
    {
      id: "21",
      type: "default",
      data: { label: "MATH 158" },
      position: { x: 400, y: 100 },
    },

    // and one of
    {
      id: "22",
      type: "default",
      data: { label: "MATH 232" },
      position: { x: 400, y: 100 },
    },
    {
      id: "23",
      type: "default",
      data: { label: "MATH 240" },
      position: { x: 400, y: 100 },
    },

    // Upper Division Requirements **

    // Students complete at least 45 upper division units including
    {
      id: "24",
      type: "default",
      data: { label: "CMPT 307" },
      position: { x: 400, y: 100 },
    },
    {
      id: "25",
      type: "default",
      data: { label: "CMPT 376W" },
      position: { x: 400, y: 100 },
    },

    // Systems Requirements **

    // Students complete at least 12 upper division units, among

    {
      id: "26",
      type: "default",
      data: { label: "CMPT 303" },
      position: { x: 400, y: 100 },
    },
    {
      id: "27",
      type: "default",
      data: { label: "CMPT 354" },
      position: { x: 400, y: 100 },
    },
    {
      id: "28",
      type: "default",
      data: { label: "CMPT 371" },
      position: { x: 400, y: 100 },
    },
    {
      id: "29",
      type: "default",
      data: { label: "CMPT 372" },
      position: { x: 400, y: 100 },
    },
    {
      id: "30",
      type: "default",
      data: { label: "CMPT 431" },
      position: { x: 400, y: 100 },
    },
    {
      id: "31",
      type: "default",
      data: { label: "CMPT 433" },
      position: { x: 400, y: 100 },
    },
    {
      id: "32",
      type: "default",
      data: { label: "CMPT 454" },
      position: { x: 400, y: 100 },
    },
    {
      id: "33",
      type: "default",
      data: { label: "CMPT 471" },
      position: { x: 400, y: 100 },
    },

    // Software Engineering Requirements **

    // Students complete at least 12 upper division units including all of
    {
      id: "34",
      type: "default",
      data: { label: "CMPT 373" },
      position: { x: 400, y: 100 },
    },
    {
      id: "35",
      type: "default",
      data: { label: "CMPT 473" },
      position: { x: 400, y: 100 },
    },
    // and at least two of
    {
      id: "36",
      type: "default",
      data: { label: "CMPT 379" },
      position: { x: 400, y: 100 },
    },
    {
      id: "37",
      type: "default",
      data: { label: "CMPT 383" },
      position: { x: 400, y: 100 },
    },
    {
      id: "38",
      type: "default",
      data: { label: "CMPT 384" },
      position: { x: 400, y: 100 },
    },
    {
      id: "39",
      type: "default",
      data: { label: "CMPT 474" },
      position: { x: 400, y: 100 },
    },
    {
      id: "40",
      type: "default",
      data: { label: "CMPT 477" },
      position: { x: 400, y: 100 },
    },
    // Capstone Project Requirement **

    // Students complete EITHER
    {
      id: "41",
      type: "default",
      data: { label: "CMPT 494" },
      position: { x: 400, y: 100 },
    },
    {
      id: "42",
      type: "default",
      data: { label: "CMPT 379" },
      position: { x: 400, y: 100 },
    },
    {
      id: "43",
      type: "default",
      data: { label: "CMPT 431" },
      position: { x: 400, y: 100 },
    },
    {
      id: "44",
      type: "default",
      data: { label: "CMPT 433" },
      position: { x: 400, y: 100 },
    },
  ];

  const nodeEdges: Edge[] = [
    { id: "6-5", source: "6", target: "5" },
    { id: "7-6", source: "7", target: "6", sourceHandle: "7a" },
    { id: "7-13", source: "7", target: "13", sourceHandle: "7b" },
    { id: "8-13", source: "8", target: "13", sourceHandle: "8a" },
    { id: "8-19", source: "8", target: "19", sourceHandle: "8b" },
    { id: "8-6", source: "8", target: "6", sourceHandle: "8c" },
    { id: "8-22", source: "8", target: "22", sourceHandle: "8d" },
    { id: "8-23", source: "8", target: "23", sourceHandle: "8e" },
    { id: "9-10", source: "9", target: "10" },
    { id: "10-13", source: "10", target: "13", sourceHandle: "10a" },
    { id: "10-6", source: "10", target: "6", sourceHandle: "10b" },
    { id: "11-10", source: "11", target: "10", sourceHandle: "10a" },
    { id: "11-13", source: "11", target: "13", sourceHandle: "10b" },
    { id: "11-15", source: "11", target: "15", sourceHandle: "10c" },
    { id: "11-16", source: "11", target: "16", sourceHandle: "10d" },
    { id: "12-13", source: "12", target: "13", sourceHandle: "12a" },
    { id: "12-6", source: "12", target: "6", sourceHandle: "12b" },
    { id: "12-16", source: "12", target: "16", sourceHandle: "12c" },
    { id: "14-8", source: "14", target: "8" },
  ];

  return (
    <div style={{ height: "50pc", width: "100%" }}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={courseNodes}
          edges={nodeEdges}
          defaultEdgeOptions={{ type: "straight" }}
          fitView
        >
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default CourseTree;
