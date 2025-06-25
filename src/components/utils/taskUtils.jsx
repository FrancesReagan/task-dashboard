

// utility functions for task management//

// formats the date to a readable format (MM/DD/YYYY)//
export const formatDate = (date) => {
  if(!date) return"";
  try {
    const d = new Date(date);
    // check if date is valid//
    if(isNaN(d.getTime())) return"Invalid Date";
        return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  } catch (error){
    return"Invalid Date";
  }
  };

}

function taskUtils() {
  return (
    <>
    
    </>
  )
}

export default taskUtils;