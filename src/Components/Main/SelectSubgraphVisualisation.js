import React, { useState, useEffect, useContext, useRef } from "react";
import Graph from "react-graph-vis";
import { AppContext } from "../../Store/AppContextProvider.js";
import { cloneDeep } from "lodash";
import Button from "@material-ui/core/Button";
import {
    Grid,
} from "@material-ui/core";

const options = {
    physics: {
        enabled: true,
        forceAtlas2Based: {
            gravitationalConstant: -50000,
            centralGravity: 0.0,
            springConstant: 0.08,
            springLength: 100,
            damping: 0,
            avoidOverlap: 1
        }
    },
    autoResize: true,
    edges: {
        color: "rgba(156, 154, 154, 1)",
        smooth: true,
        /*smooth: {
              enabled: true,
              type: "dynamic",
              roundness: 1
            },*/
        physics: true,
        arrows: {
            to: {
                scaleFactor: 1.3
            }
        },
        arrowStrikethrough: false,
        endPointOffset: {
            from: 20,
            to: 0
        }
    },
    nodes: {
        shape: "box",
        color: "rgba(97,195,238,0.5)",
        font: { size: 14, strokeWidth: 4, strokeColor: "white" },
        widthConstraint: {
            minimum: 60,
            maximum: 60
        },
        heightConstraint: {
            minimum: 30
        }
    },
    height: "100%",
    interaction: { hover: true },
    groups: {
        node: {
            shape: "box",
            color: "rgba(84, 135, 237, 0.5)",
            font: { size: 14, strokeWidth: 4, strokeColor: "white" },
            widthConstraint: {
                minimum: 60,
                maximum: 60
            },
            heightConstraint: {
                minimum: 30
            }
        },
        token: {
            shape: "box",
            color: "rgba(84, 237, 110, 0.7)",
            font: { size: 14, strokeWidth: 4, strokeColor: "white" },
            widthConstraint: {
                minimum: 60,
                maximum: 60
            },
            heightConstraint: {
                minimum: 30
            }
        },
        longestPath: {
            shape: "box",
            color: "rgba(245, 0, 87, 0.7)",
            font: { size: 14, strokeWidth: 4, strokeColor: "white" },
            widthConstraint: {
                minimum: 60,
                maximum: 60
            },
            heightConstraint: {
                minimum: 30
            }
        },
        Selected: {
            shape: "box",
            color: "rgba(255, 0, 0, 0.65)",
            font: { size: 14, strokeWidth: 4, strokeColor: "white" },
            widthConstraint: {
                minimum: 60,
                maximum: 60
            },
            heightConstraint: {
                minimum: 30
            }
        }
    }
};

const SelectSubgraphVisualisation = () => {
    const { state, dispatch } = useContext(AppContext);
    const [currentVis, setCurrentVis] = React.useState(
        state.selectedSentenceVisualisation
    );

    function getSelected() {
        //console.log(currentVis);
        let nodeID = [];
        let edgeID = [];
        let graphID = currentVis.id;

        for (let x of currentVis.nodes) {
            if (x.group === "Selected") {
                nodeID.push(x.id);
            }
        }

        for (let x of currentVis.edges) {
            if (x.group === "Selected") {
                edgeID.push(x.id);
            }
        }

        const returnValue = { id: graphID, nodes: nodeID, edges: edgeID };
        console.log(returnValue);

        return returnValue;
    }

    const events = {
        select: function (event) {
            let { nodes, edges } = event;
            //console.log(nodes, edges);

            let currentStandardVisualisation = cloneDeep(currentVis);

            for (const [i, x] of currentStandardVisualisation.nodes.entries()) {
                if (x.id === nodes[0] && x.group === "node") {
                    //If not selected - mark as selected
                    currentStandardVisualisation.nodes[i].group = "Selected";
                } else if (x.id === nodes[0] && x.group === "Selected") {
                    //Else if selected - deselect node
                    currentStandardVisualisation.nodes[i].group = "node";
                }
            }

            if (nodes.length === 0) {
                for (const [i, x] of currentStandardVisualisation.edges.entries()) {
                    if (x.id === edges[0] && x.group !== "Selected") {
                        currentStandardVisualisation.edges[i] = {
                            ...x,
                            color: "rgba(0, 0, 0, 1)",
                            shadow: true,
                            group: "Selected",
                            background: {
                                enabled: true,
                                color: "#ff0000"
                            }
                        };
                    } else if (x.id === edges[0] && x.group === "Selected") {
                        currentStandardVisualisation.edges[i] = {
                            ...x,
                            color: "rgba(156, 154, 154, 1)",
                            group: "normal",
                            shadow: false,
                            background: {
                                enabled: false
                            }
                        };
                    }
                }
            }

            setCurrentVis(currentStandardVisualisation);
        }
    };

    return (

                <Graph
                    graph={currentVis}
                    options={options}
                    events={events}
                    getNetwork={(network) => {
                        network.on("hoverNode", function (params) {
                            network.canvas.body.container.style.cursor = 'pointer'
                        });
                    }}
                />

    );
};
export default SelectSubgraphVisualisation;
