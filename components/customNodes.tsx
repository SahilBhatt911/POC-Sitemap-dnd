'use client';
import { useCallback, useState } from 'react';
import { GripVertical } from 'lucide-react';
import DnDWrapper from './Wrapper/DndWrapper';

const handleStyle = { left: 10 };

function CustomNode({ data, id }: any) {
  const [fields, setFields] = useState([
    { id: 'field1', name: 'Field 1', description: 'Description for Field 1' },
    { id: 'field2', name: 'Field 2', description: 'Description for Field 2' },
  ]);

  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="relative flex justify-between h-auto">
      <div className="col-span-2 flex flex-col z-[1]">
        <div className="col-start-2 row-start-1 flex justify-center w-[200px]">
          <div className="text-updater-node h-auto border border-[#cbcbcb99] rounded-[10px] bg-[#fcfcfc] relative">
            <header className="pl-[10px] pr-[10px] h-[30px] rounded-t-[10px]">
              <div className="flex flex-row justify-between items-center p-[8px]">
                <h2 className="font-medium text-white text-[12px] leading-[9px]">Home Page</h2>
              </div>
            </header>

            <div className="flex justify-around p-[8px] z-[10000]">
              <DnDWrapper
                items={fields}
                onReorder={setFields}
                renderItem={(field, index, provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-row gap-[4px] border border-[#cbcbcb99] hover:border-[#DC79FF] border-solid rounded-[4px] bg-white p-2 mt-[7px] h-[60px] w-[200px]"
                  >
                    <div className="flex justify-center items-center w-[24px]">
                      <GripVertical className="w-22 h-22 text-[#AEAEAE]" />
                    </div>
                    <div className="flex flex-col">
                      <input
                        style={handleStyle}
                        type="text"
                        defaultValue={field.name}
                        onChange={onChange}
                        placeholder="Name"
                        className="text-[#091e42] font-inter font-medium text-base w-[150px]"
                      />
                      <input
                        style={handleStyle}
                        type="text"
                        defaultValue={field.description}
                        onChange={onChange}
                        placeholder="Description"
                        className="text-[#5e6c84] font-inter text-base font-normal leading-[150%] w-[150px]"
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomNode;
