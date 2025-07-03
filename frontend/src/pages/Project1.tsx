import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Node {
  id: string;
  label: string;
  fullText: string;
  x: number;
  y: number;
}

interface Link {
  source: string | Node;
  target: string | Node;
  weight: number;
}

const Project1 = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const simulationRef = useRef<d3.Simulation<any, undefined> | null>(null);
  const [nodes, setNodes] = useState<Node[]>([
    { id: '1', label: 'ALP', fullText: 'Alpha Node', x: 100, y: 100 },
    { id: '2', label: 'BET', fullText: 'Beta Node', x: 300, y: 100 },
    { id: '3', label: 'GAM', fullText: 'Gamma Node', x: 200, y: 200 }
  ]);
  const [links, setLinks] = useState<Link[]>([
    { source: '1', target: '2', weight: 5 },
    { source: '2', target: '3', weight: 3 },
    { source: '3', target: '1', weight: 7 }
  ]);
  const [nextNodeId, setNextNodeId] = useState(4);
  const [editingNode, setEditingNode] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Function to generate random 3-letter abbreviation
  const generateRandomAbbreviation = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 3; i++) {
      result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return result;
  };

  // Function to abbreviate text to 3 characters
  const abbreviateText = (text: string) => {
    if (!text) return '';
    return text.length > 3 ? text.substring(0, 3).toUpperCase() : text.toUpperCase();
  };

  // Function to handle node text editing
  const handleNodeEdit = (nodeId: string, newText: string) => {
    const abbreviated = abbreviateText(newText);
    setNodes(prev => prev.map(node => 
      node.id === nodeId 
        ? { ...node, fullText: newText, label: abbreviated }
        : node
    ));
    setEditingNode(null);
    setEditText('');
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const container = svgRef.current.parentElement;
    const width = container?.clientWidth || 800;
    const height = container?.clientHeight || 600;

    // Set SVG dimensions
    svg.attr('width', width).attr('height', height);

    // Create or update simulation
    if (!simulationRef.current) {
      simulationRef.current = d3.forceSimulation()
        .force('link', d3.forceLink().id((d: any) => d.id).distance((d: any) => d.weight * 20))
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force('collision', d3.forceCollide().radius(35))
        .force('boundary', () => {
          nodes.forEach((node: any) => {
            node.x = Math.max(35, Math.min(width - 35, node.x));
            node.y = Math.max(35, Math.min(height - 35, node.y));
          });
        });
    }

    const simulation = simulationRef.current;

    // Update simulation forces
    simulation.force('center', d3.forceCenter(width / 2, height / 2));
    
    // Convert string IDs to node references for D3
    const linksWithNodes = links.map(link => {
      const sourceNode = typeof link.source === 'string' ? nodes.find(n => n.id === link.source) : link.source;
      const targetNode = typeof link.target === 'string' ? nodes.find(n => n.id === link.target) : link.target;
      
      if (!sourceNode || !targetNode) {
        console.warn(`Link references missing node: source=${link.source}, target=${link.target}`);
        return null;
      }
      
      return {
        ...link,
        source: sourceNode,
        target: targetNode
      };
    }).filter(link => link !== null) as any[];
    
    (simulation.force('link') as d3.ForceLink<any, any>).links(linksWithNodes);
    simulation.nodes(nodes);

    // Only restart simulation if we have valid data
    if (nodes.length > 0) {
      simulation.alpha(1).restart();
    }

    // Add arrow marker if it doesn't exist
    if (svg.select('#arrowhead').empty()) {
      svg.append('defs').append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '-0 -5 10 10')
        .attr('refX', 30)
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('xoverflow', 'visible')
        .append('svg:path')
        .attr('d', 'M 0,-5 L 10 ,0 L 0,5')
        .attr('fill', '#999')
        .style('stroke', 'none');
    }

    // Update links
    const linkSelection = svg.selectAll('.link-line')
      .data(linksWithNodes, (d: any) => `${d.source.id}-${d.target.id}`);

    linkSelection.exit().remove();

    const linkEnter = linkSelection.enter()
      .append('line')
      .attr('class', 'link-line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)');

    const linkUpdate = linkEnter.merge(linkSelection as any);

    // Update link labels
    const linkLabelSelection = svg.selectAll('.link-label')
      .data(linksWithNodes, (d: any) => `${d.source.id}-${d.target.id}`);

    linkLabelSelection.exit().remove();

    const linkLabelEnter = linkLabelSelection.enter()
      .append('text')
      .attr('class', 'link-label')
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .style('font-size', '12px')
      .style('fill', '#666');

    const linkLabelUpdate = linkLabelEnter.merge(linkLabelSelection as any)
      .text((d: any) => d.weight);

    // Update nodes
    const nodeSelection = svg.selectAll('.node-circle')
      .data(nodes, (d: any) => d.id);

    nodeSelection.exit().remove();

    const nodeEnter = nodeSelection.enter()
      .append('circle')
      .attr('class', 'node-circle')
      .attr('r', 25)
      .attr('fill', '#69b3a2')
      .attr('stroke', '#2c3e50')
      .attr('stroke-width', 2)
      .style('cursor', 'grab')
      .style('pointer-events', 'all')
      .on('dblclick', (event, d) => {
        event.stopPropagation();
        setEditingNode(d.id);
        setEditText(d.fullText);
      })
      .call(d3.drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended) as any);

    const nodeUpdate = nodeEnter.merge(nodeSelection as any);

    // Update node labels
    const nodeLabelSelection = svg.selectAll('.node-label')
      .data(nodes, (d: any) => d.id);

    nodeLabelSelection.exit().remove();

    const nodeLabelEnter = nodeLabelSelection.enter()
      .append('text')
      .attr('class', 'node-label')
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .style('pointer-events', 'none')
      .style('user-select', 'none')
      .on('mouseover', function(event, d) {
        // Remove any existing tooltips
        d3.selectAll('.tooltip').remove();
        
        // Show tooltip with full text
        const tooltip = d3.select('body').append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.8)')
          .style('color', 'white')
          .style('padding', '8px 12px')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')
          .text(d.fullText);
        
        tooltip.style('left', (event.pageX + 10) + 'px')
               .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.selectAll('.tooltip').remove();
      });

    const nodeLabelUpdate = nodeLabelEnter.merge(nodeLabelSelection as any)
      .text((d: any) => d.label);



    // Update positions on simulation tick
    simulation.on('tick', () => {
      linkUpdate
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      linkLabelUpdate
        .attr('x', (d: any) => (d.source.x + d.target.x) / 2)
        .attr('y', (d: any) => (d.source.y + d.target.y) / 2);

      nodeUpdate
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      nodeLabelUpdate
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);


    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
      // Change cursor to grabbed
      d3.select(event.sourceEvent.target).style('cursor', 'grabbing');
    }

    function dragged(event: any, d: any) {
      const constrainedX = Math.max(35, Math.min(width - 35, event.x));
      const constrainedY = Math.max(35, Math.min(height - 35, event.y));
      d.fx = constrainedX;
      d.fy = constrainedY;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
      // Change cursor back to grab
      d3.select(event.sourceEvent.target).style('cursor', 'grab');
    }

    return () => {
      // Clean up tooltips on unmount
      d3.selectAll('.tooltip').remove();
    };
  }, [nodes, links]);

  const addNode = () => {
    const randomAbbrev = generateRandomAbbreviation();
    const container = svgRef.current?.parentElement;
    const width = container?.clientWidth || 800;
    const height = container?.clientHeight || 600;
    
    const newNode: Node = {
      id: nextNodeId.toString(),
      label: randomAbbrev,
      fullText: `Node ${randomAbbrev}`,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100
    };
    setNodes(prev => [...prev, newNode]);
    setNextNodeId(prev => prev + 1);
  };

  const addLink = () => {
    if (nodes.length < 2) return;
    
    const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
    let targetNode = nodes[Math.floor(Math.random() * nodes.length)];
    
    // Ensure source and target are different
    while (targetNode.id === sourceNode.id && nodes.length > 1) {
      targetNode = nodes[Math.floor(Math.random() * nodes.length)];
    }
    
    // Check if link already exists
    const linkExists = links.some(link => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      return (sourceId === sourceNode.id && targetId === targetNode.id) ||
             (sourceId === targetNode.id && targetId === sourceNode.id);
    });
    
    if (linkExists) return;
    
    const newLink: Link = {
      source: sourceNode.id,
      target: targetNode.id,
      weight: Math.floor(Math.random() * 10) + 1
    };
    
    setLinks(prev => [...prev, newLink]);
  };

  const clearAll = () => {
    setNodes([]);
    setLinks([]);
    setNextNodeId(1);
    // Stop simulation
    if (simulationRef.current) {
      simulationRef.current.stop();
      simulationRef.current = null;
    }
    // Clear SVG
    if (svgRef.current) {
      d3.select(svgRef.current).selectAll('*').remove();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-gray-900">
            D3.js Graph Editor
          </h1>
          <p className="text-gray-600">
            Interactive graph with nodes, directed edges, and weights
          </p>
        </div>
      </header>

      {/* Controls */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-6xl mx-auto flex space-x-4">
          <button
            onClick={addNode}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Node
          </button>
          <button
            onClick={addLink}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Add Random Link
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Clear All
          </button>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>Nodes: {nodes.length}</span>
            <span>Links: {links.length}</span>
          </div>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 bg-white m-4 rounded-lg shadow-lg overflow-hidden border-4 border-gray-300" style={{ minHeight: 'calc(100vh - 200px)' }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          style={{ minHeight: 'calc(100vh - 200px)' }}
        />
        
        {/* Node Editing Modal */}
        {editingNode && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Edit Node Text</h3>
              <p className="text-sm text-gray-600 mb-2">
                Enter text (will be abbreviated to 3 letters for display)
              </p>
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter node text..."
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleNodeEdit(editingNode, editText);
                  }
                }}
              />
              <div className="text-xs text-gray-500 mt-1">
                Preview: {abbreviateText(editText)}
              </div>
              <div className="flex space-x-3 mt-4">
                <button
                  onClick={() => handleNodeEdit(editingNode, editText)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingNode(null);
                    setEditText('');
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="bg-white shadow-sm border-t">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="text-sm text-gray-600">
            <p><strong>Features:</strong> Drag nodes to reposition • Double-click node labels to edit • Links auto-space by weight • Directed arrows with weight labels • Hover for full text</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project1;